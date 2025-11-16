# Test Data Management Access

## 🧪 Test Data Inserter
Access the test data management interface at:
**http://127.0.0.1:3000/?test-data=true**

This interface allows you to:
- ✅ Insert comprehensive test data (users, classes, instructors, sessions, bookings, achievements)
- 📊 View current database state and table counts
- 🔄 Refresh database status
- 🎯 Get step-by-step instructions for testing

## 🔍 Database Explorer  
Access the database structure explorer at:
**http://127.0.0.1:3000/?db-explorer=true**

This interface shows:
- 📋 All existing tables in your database
- 🏗️ Table structure and column information
- 📊 Sample data from each table
- 🔗 Relationships between tables

## 🚀 Quick Start Guide

1. **Insert Test Data**: Visit the test data inserter URL above and click "Insert Test Data"
2. **Verify Data**: Check the database explorer to confirm data was inserted
3. **Test App**: Navigate to http://127.0.0.1:3000/ to test with real data
4. **Login**: Use any of the test users (e.g., alice.thompson@email.com or admin.user@wellness.com)

## 📋 Test Data Overview

The test dataset includes:
- **10 Users** (8 students + 2 admins) with realistic profiles
- **5 Classes** across different categories (Dance, Leadership, Business, Wellness, Theatre)
- **5 Instructors** with expertise, ratings, and contact information
- **10 Sessions** scheduled for upcoming dates with real availability
- **10 Bookings** with various statuses (confirmed, pending, waitlist)
- **10 Achievements** for gamification testing

## 🔧 Development Notes

- Test data uses UUID-based IDs for proper database relationships
- All data follows the existing database schema structure
- Includes realistic pricing, capacity, and scheduling information
- Ready for real-time functionality testing

## 🎯 Testing Checklist

After inserting test data, verify:
- [ ] User authentication works with test accounts
- [ ] Class browsing shows real class information
- [ ] Booking system reflects real availability
- [ ] Admin functions work with real instructor data
- [ ] Personal profiles display real user information
- [ ] Achievements and XP system functions correctly
