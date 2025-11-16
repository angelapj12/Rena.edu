-- Schema Step 3 Fix: Add missing columns to instructors table
-- Run this before running schema-step3.sql

-- Add missing columns to instructors table if they don't exist
DO $$ 
BEGIN
    -- Add is_active column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'instructors' AND column_name = 'is_active'
    ) THEN
        ALTER TABLE instructors ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
    
    -- Add featured column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'instructors' AND column_name = 'featured'
    ) THEN
        ALTER TABLE instructors ADD COLUMN featured BOOLEAN DEFAULT false;
    END IF;
    
    -- Add profile_image_url column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'instructors' AND column_name = 'profile_image_url'
    ) THEN
        ALTER TABLE instructors ADD COLUMN profile_image_url TEXT;
    END IF;
    
    -- Add hourly_rate column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'instructors' AND column_name = 'hourly_rate'
    ) THEN
        ALTER TABLE instructors ADD COLUMN hourly_rate DECIMAL(8,2);
    END IF;
    
    -- Add currency column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'instructors' AND column_name = 'currency'
    ) THEN
        ALTER TABLE instructors ADD COLUMN currency TEXT DEFAULT 'USD';
    END IF;
END $$;

-- Success message
SELECT 'Missing columns added to instructors table successfully!' as result;
