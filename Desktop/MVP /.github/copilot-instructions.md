<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Wellness Class Management App - Copilot Instructions

## Project Overview
This is a mobile-first wellness class management web app built with:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + real-time subscriptions + RLS)
- **Authentication**: Firebase Auth with multi-factor authentication (MFA)
- **Notifications**: Firebase Cloud Messaging (FCM)
- **Analytics**: Chart.js for admin dashboard
- **Gamification**: XP/Level system with streak tracking

## Architecture Guidelines

### User Roles
- **Student**: Browse classes, book/cancel, view XP/levels/streaks
- **Admin**: CRUD classes & instructors, analytics dashboard, promotions
- **Instructor**: Linked to admin users, can be promoted

### Key Features
1. **Class Management**: Book/cancel with atomic capacity checks
2. **Gamification**: XP rewards, level progression, daily/weekly streaks
3. **Monetization**: Instructors pay for featured class placement
4. **Real-time**: Live capacity updates, booking notifications
5. **Security**: Row-level security (RLS), Firebase MFA

### Code Organization
```
src/
├── components/          # Reusable UI components
├── pages/              # Route-based page components
├── services/           # Business logic & API calls
│   ├── authFirebase.ts # Firebase authentication
│   ├── db.ts          # Supabase database operations
│   ├── booking.ts     # Booking system logic
│   ├── gamification.ts # XP/level calculations
│   └── notifications.ts # FCM push notifications
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Coding Standards

### Services Layer
- All services should have typed input/output contracts
- Use consistent logging with service prefixes: `[Auth]`, `[DB]`, `[Booking]`, `[XP]`, `[FCM]`
- Handle errors gracefully with proper user feedback
- Implement atomic operations for critical paths (booking, XP updates)

### Database Operations
- Always use Supabase RLS policies for data security
- Prefer PostgreSQL functions for complex operations (booking, XP calculations)
- Use `firebase_uid` as the primary key for user identification
- Implement proper indexes for performance

### UI/UX Guidelines
- Mobile-first responsive design
- Use Tailwind CSS utility classes
- Implement proper loading states and error handling
- Follow accessibility best practices
- Use consistent color scheme (primary blue, success green)

### Security Requirements
- Never expose sensitive data in client-side code
- Validate all user inputs
- Use Firebase custom tokens for Supabase authentication
- Implement proper CORS and CSP headers
- Audit all admin actions

### Testing Strategy
- Unit tests for business logic (gamification, calculations)
- Integration tests for critical user flows
- E2E tests with Playwright for main scenarios
- Security testing for RLS policies

## Common Patterns

### Error Handling
```typescript
try {
  const result = await serviceCall();
  console.log('[Service] Success:', result);
  return result;
} catch (error) {
  console.error('[Service] Error:', error);
  throw new Error('User-friendly error message');
}
```

### State Management
- Use React Context for global auth state
- Local state for component-specific data
- Supabase real-time subscriptions for live updates

### API Calls
- Always include proper TypeScript types
- Use consistent naming conventions
- Implement proper caching strategies
- Handle network failures gracefully

When generating code, prioritize security, performance, and user experience. Always consider mobile users first, implement proper error states, and ensure data consistency across all operations.
