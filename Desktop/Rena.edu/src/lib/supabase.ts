import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl) {
  console.warn('NEXT_PUBLIC_SUPABASE_URL is not set. Using fallback URL.');
}

if (!supabaseAnonKey) {
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Using fallback key.');
}

// Create client with fallback values to prevent build errors
// These will be replaced at runtime if env vars are set
const finalUrl = supabaseUrl || 'https://ydzngmpadhsgzjoksnvg.supabase.co';
const finalKey = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkem5nbXBhZGhzZ3pqb2tzbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MzU1MjcsImV4cCI6MjA4NDExMTUyN30.hoT93eczIHs8X1rzkLSvA2ixzqclZcG0TYM5ouW5kFg';

// Log the URL being used (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase URL:', finalUrl);
  console.log('Supabase Project ID:', finalUrl.replace('https://', '').replace('.supabase.co', ''));
  console.log('Anon Key (first 20 chars):', finalKey.substring(0, 20) + '...');
}

export const supabase = createClient(finalUrl, finalKey);
