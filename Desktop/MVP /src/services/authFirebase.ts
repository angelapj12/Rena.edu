import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  multiFactor,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
} from 'firebase/auth';
import {
  getMessaging,
  Messaging,
  getToken,
  onMessage,
} from 'firebase/messaging';
import type { FirebaseConfig, AuthUser } from '../types';

let app: FirebaseApp;
let auth: Auth;
let messaging: Messaging;

export function initFirebase(config: FirebaseConfig) {
  console.log('[Auth] Initializing Firebase...');
  
  app = initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
  });

  auth = getAuth(app);
  
  // Initialize messaging if supported
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    messaging = getMessaging(app);
  }

  console.log('[Auth] Firebase initialized');
  return { auth, messaging };
}

export async function signUpEmailPassword(email: string, password: string) {
  console.log('[Auth] signUpEmailPassword', email);
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  return { user: credential.user };
}

export async function signInEmailPassword(email: string, password: string) {
  console.log('[Auth] signInEmailPassword', email);
  const credential = await signInWithEmailAndPassword(auth, email, password);
  
  // Check if MFA is enrolled
  const mfaFactors = multiFactor(credential.user).enrolledFactors;
  const mfaRequired = mfaFactors.length === 0;

  return { 
    user: credential.user, 
    mfaRequired 
  };
}

export async function signOutUser() {
  console.log('[Auth] signOut');
  await signOut(auth);
}

export async function enforceMFAIfEligible(
  user: User, 
  phoneNumber: string
): Promise<{ enrolled: boolean }> {
  console.log('[Auth] enforceMFAIfEligible for', user.uid);
  
  try {
    // Create RecaptchaVerifier
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
    });

    const mfaSession = await multiFactor(user).getSession();
    
    const phoneInfoOptions = {
      phoneNumber,
      session: mfaSession,
    };

    const phoneAuthProvider = new PhoneMultiFactorGenerator.PhoneAuthProvider(auth);
    const verificationId = await phoneAuthProvider.verifyPhoneNumber(
      phoneInfoOptions, 
      recaptchaVerifier
    );

    // In a real app, you'd get the SMS code from user input
    // For now, return enrollment status
    console.log('[Auth] MFA verification initiated', verificationId);
    
    return { enrolled: true };
  } catch (error) {
    console.error('[Auth] MFA enrollment error', error);
    return { enrolled: false };
  }
}

export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  
  try {
    const token = await user.getIdToken(true);
    return token;
  } catch (error) {
    console.error('[Auth] Failed to get ID token', error);
    return null;
  }
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || undefined,
        photoURL: user.photoURL || undefined,
        emailVerified: user.emailVerified,
      });
    } else {
      callback(null);
    }
  });
}

// FCM functions
export async function initFCM(vapidKey: string): Promise<string | null> {
  if (!messaging) {
    console.warn('[FCM] Messaging not available');
    return null;
  }

  console.log('[FCM] Requesting notification permission...');
  const permission = await Notification.requestPermission();
  
  if (permission !== 'granted') {
    console.warn('[FCM] Notification permission not granted');
    return null;
  }

  try {
    const token = await getToken(messaging, { vapidKey });
    console.log('[FCM] Token acquired', token?.slice(0, 10) + '...');
    
    // Listen for foreground messages
    onMessage(messaging, (payload) => {
      console.log('[FCM] Foreground message received', payload);
      
      // Show notification
      if (payload.notification) {
        new Notification(payload.notification.title || 'Notification', {
          body: payload.notification.body,
          icon: payload.notification.icon || '/icon-192x192.png',
        });
      }
    });

    return token;
  } catch (error) {
    console.error('[FCM] Failed to get token', error);
    return null;
  }
}

export { auth, messaging };
