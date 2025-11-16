import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  initFirebase, 
  onAuthStateChange, 
  signInEmailPassword, 
  signUpEmailPassword,
  signOutUser,
  getIdToken 
} from '../services/authFirebase';
import { upsertUserProfile, getUserProfile } from '../services/db';
import NotificationService from '../services/notifications';
import type { AuthUser, User, FirebaseConfig } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  userProfile: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
  config: FirebaseConfig;
}

export function AuthProvider({ children, config }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notificationService] = useState(() => new NotificationService());

  // Initialize Firebase
  useEffect(() => {
    console.log('[Auth] Initializing Firebase Auth');
    
    try {
      initFirebase(config);
    } catch (err) {
      console.error('[Auth] Failed to initialize Firebase', err);
      setError('Failed to initialize authentication');
      setLoading(false);
      return;
    }

    // Listen for auth state changes
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      console.log('[Auth] Auth state changed', firebaseUser?.uid);
      
      setLoading(true);
      setError(null);

      try {
        if (firebaseUser) {
          // Check if email is verified
          if (!firebaseUser.emailVerified) {
            console.warn('[Auth] Email not verified');
            setError('Please verify your email before continuing');
            setUser(null);
            setUserProfile(null);
            return;
          }

          setUser(firebaseUser);

          // Get or create user profile in Supabase
          let profile = await getUserProfile(firebaseUser.uid);
          
          if (!profile) {
            // Create new profile
            console.log('[Auth] Creating new user profile');
            profile = await upsertUserProfile({
              firebase_uid: firebaseUser.uid,
              email: firebaseUser.email,
              display_name: firebaseUser.displayName || undefined,
              photo_url: firebaseUser.photoURL || undefined,
              role: 'student', // Default role
            });
          } else {
            // Update existing profile with latest data from Firebase
            profile = await upsertUserProfile({
              firebase_uid: firebaseUser.uid,
              email: firebaseUser.email,
              display_name: firebaseUser.displayName || profile.display_name,
              photo_url: firebaseUser.photoURL || profile.photo_url,
              role: profile.role, // Preserve existing role
            });
          }

          setUserProfile(profile);

          // Initialize notifications
          if (config.vapidKey) {
            await notificationService.initialize(config.vapidKey, firebaseUser.uid);
          }

          // Set Supabase auth token
          const token = await getIdToken();
          if (token) {
            // This would be used to set the Supabase auth header if needed
            console.log('[Auth] Firebase token acquired for Supabase');
          }

        } else {
          // User signed out
          setUser(null);
          setUserProfile(null);
          
          // Clean up notifications
          if (user) {
            await notificationService.unregisterToken(user.uid);
          }
        }
      } catch (err) {
        console.error('[Auth] Error handling auth state change', err);
        setError('Authentication error occurred');
        setUser(null);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [config, user?.uid]);

  const signIn = async (email: string, password: string) => {
    console.log('[Auth] Signing in user', email);
    setLoading(true);
    setError(null);

    try {
      const result = await signInEmailPassword(email, password);
      
      if (result.mfaRequired) {
        setError('Multi-factor authentication setup required. Please complete setup to continue.');
        return;
      }

      // Auth state change will handle the rest
    } catch (err: any) {
      console.error('[Auth] Sign in error', err);
      
      // Handle specific Firebase auth errors
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/user-disabled') {
        setError('Account has been disabled');
      } else {
        setError('Sign in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    console.log('[Auth] Signing up new user', email);
    setLoading(true);
    setError(null);

    try {
      const result = await signUpEmailPassword(email, password);
      
      // Send verification email (Firebase handles this automatically)
      if (result.user && !result.user.emailVerified) {
        setError('Please check your email and click the verification link before signing in.');
        await signOutUser();
        return;
      }

      // Auth state change will handle profile creation
    } catch (err: any) {
      console.error('[Auth] Sign up error', err);
      
      // Handle specific Firebase auth errors
      if (err.code === 'auth/email-already-in-use') {
        setError('An account already exists with this email');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else {
        setError('Account creation failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    console.log('[Auth] Signing out user');
    setLoading(true);
    
    try {
      await signOutUser();
      // Auth state change will handle cleanup
    } catch (err) {
      console.error('[Auth] Sign out error', err);
      setError('Sign out failed');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const refreshProfile = async () => {
    if (!user) return;
    
    console.log('[Auth] Refreshing user profile');
    
    try {
      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);
    } catch (err) {
      console.error('[Auth] Failed to refresh profile', err);
    }
  };

  const contextValue: AuthContextType = {
    user,
    userProfile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    clearError,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Helper hook for role-based access
export function useRequireAuth(requiredRole?: 'admin' | 'instructor') {
  const { user, userProfile, loading } = useAuth();
  
  const hasAccess = React.useMemo(() => {
    if (!user || !userProfile) return false;
    if (!requiredRole) return true; // Just require authentication
    
    return userProfile.role === requiredRole || userProfile.role === 'admin';
  }, [user, userProfile, requiredRole]);

  return {
    user,
    userProfile,
    loading,
    hasAccess,
    isAuthenticated: !!user && !!userProfile,
  };
}

// Helper hook for admin access
export function useAdminAccess() {
  return useRequireAuth('admin');
}
