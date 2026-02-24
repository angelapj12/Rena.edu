# Localization Guide for Rena.edu

## Overview
This guide explains how to add Traditional Chinese (zh-TW) localization to your Next.js 14 site using `next-intl`.

## Approach: next-intl

**Why next-intl?**
- Built specifically for Next.js App Router (what you're using)
- Handles URL routing automatically (`/en/`, `/zh-TW/`)
- Type-safe translations
- Simple API for switching languages
- Great developer experience

## Architecture

### New Directory Structure
```
src/app/
  [locale]/              # New dynamic locale segment
    page.tsx             # Home page
    space/
      page.tsx           # Space page
    book/
      page.tsx           # Booking page
  layout.tsx             # Root layout (handles locale detection)
```

### Translation Files
```
messages/
  en.json                # English translations
  zh-TW.json             # Traditional Chinese translations
```

## Step-by-Step Implementation

### Step 1: Extract English Copy
- All hardcoded text will be moved to `messages/en.json`
- Each page/component will have its own namespace
- Easy to edit English copy in one place

### Step 2: Install next-intl
```bash
npm install next-intl
```

### Step 3: Configure next-intl
- Create `src/i18n/request.ts` for locale detection
- Update `next.config.js` with i18n plugin
- Configure supported locales: `en`, `zh-TW`

### Step 4: Restructure App Directory
- Move pages to `[locale]/` folder
- Update routing to include locale parameter
- Update `Link` components to include locale

### Step 5: Add Translations
- Create `messages/zh-TW.json` with Traditional Chinese text
- Match structure of `messages/en.json`
- Can be done gradually (page by page)

### Step 6: Update Components
- Replace hardcoded strings with `useTranslations()` hook
- Example: `"Hello"` → `t('homepage.hero.title')`

### Step 7: Add Language Switcher
- Add dropdown/buttons in Header component
- Allows users to switch between English and Traditional Chinese

## URL Structure

### Before
- `/` - Home (English)
- `/space` - Space page
- `/book` - Booking page

### After
- `/en/` - Home (English)
- `/zh-TW/` - Home (Traditional Chinese)
- `/en/space` - Space page (English)
- `/zh-TW/space` - Space page (Traditional Chinese)
- `/en/book` - Booking page (English)
- `/zh-TW/book` - Booking page (Traditional Chinese)

## Benefits

1. **Easy to Edit English Copy**: All English text in one place (`messages/en.json`)
2. **SEO Friendly**: Each language has its own URL
3. **Type Safety**: TypeScript ensures translation keys exist
4. **Scalable**: Easy to add more languages later
5. **Maintainable**: Clear separation between code and content

## Editing English Copy

Once set up, you can edit all English text by simply editing `messages/en.json`:

```json
{
  "homepage": {
    "hero": {
      "title": "The perfect studio for your needs...",
      "subtitle": "Ready When You Are",
      "description": "A licensed, fully equipped..."
    }
  }
}
```

No need to search through multiple files!

## Next Steps

1. Review this guide
2. Confirm you want to proceed with next-intl
3. I'll implement it step by step
