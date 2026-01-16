import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create client with fallback values to prevent build errors
// These will be replaced at runtime if env vars are set
export const supabase = createClient(
  supabaseUrl || 'https://ydzngmpadhsgzjoksnvg.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkem5nbXBhZGhzZ3pqb2tzbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MzU1MjcsImV4cCI6MjA4NDExMTUyN30.hoT93eczIHs8X1rzkLSvA2ixzqclZcG0TYM5ouW5kFg'
);
