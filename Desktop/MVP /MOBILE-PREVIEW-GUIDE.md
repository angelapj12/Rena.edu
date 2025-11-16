# 📱 WellnessHub - Mobile Preview Guide

## 🌙 Dark Mode Mobile App

Your WellnessHub app is now styled with a beautiful dark theme optimized for mobile devices!

### 🎨 **Dark Theme Colors:**
- **Background**: `#2d2e37` (Dark charcoal)
- **Cards/Panels**: `#3a3b47` (Lighter charcoal)
- **Highlight/Actions**: `#cff45e` (Bright lime green)
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#9ca3af` (Light gray)

## 📱 **How to View Mobile Preview:**

### **Method 1: Browser Developer Tools**
1. **Open the app**: `npm run dev` or `./mobile-preview.sh`
2. **Open Developer Tools**: Press `F12` (or `Cmd+Option+I` on Mac)
3. **Toggle Device Toolbar**: Click the device icon (📱) or press `Ctrl+Shift+M`
4. **Select Mobile Device**: Choose from:
   - iPhone 14 Pro (393 x 852)
   - iPhone SE (375 x 667) 
   - Galaxy S20 Ultra (412 x 915)
   - Pixel 7 (412 x 915)

### **Method 2: VS Code Simple Browser**
1. **Start dev server**: `npm run dev`
2. **Open Simple Browser**: View > Command Palette > "Simple Browser"
3. **Navigate to**: `http://localhost:5173`
4. **Resize window** to mobile dimensions

### **Method 3: Responsive Design Mode**
1. **Right-click** on the page
2. **Select "Inspect Element"**
3. **Click responsive design toggle**
4. **Set custom dimensions**: 375px width (mobile)

## 📱 **Mobile-Optimized Features:**

### **🎯 Navigation Design**
- **Students**: Bottom navigation bar (fixed)
- **Admins**: Collapsible side navigation
- **Touch-friendly**: Large tap targets (44px min)

### **🌙 Dark Mode Benefits**
- **Battery saving** on OLED screens
- **Reduced eye strain** in low light
- **Modern appearance** 
- **Better focus** on content

### **📊 Mobile Layout**
- **Single column** layouts on small screens
- **Card-based** design for easy scanning
- **Sticky headers** for navigation context
- **Swipe-friendly** interactions

## 🧪 **Mobile Testing Checklist:**

### **✅ Core Functionality**
- [ ] Login screen responsive
- [ ] Bottom navigation works
- [ ] Class booking buttons large enough
- [ ] Booking notifications visible
- [ ] Cards stack properly on small screens

### **✅ Touch Interactions**
- [ ] All buttons easily tappable
- [ ] Scroll performance smooth
- [ ] No horizontal scrolling
- [ ] Forms easy to fill on mobile

### **✅ Dark Mode Elements**
- [ ] Text readable on dark backgrounds
- [ ] Highlight color (#cff45e) stands out
- [ ] Cards have proper contrast
- [ ] Loading states visible

## 📏 **Responsive Breakpoints:**

```css
/* Your app automatically adapts to: */
Mobile: 320px - 767px   (Current target)
Tablet: 768px - 1023px  (Will scale well)
Desktop: 1024px+        (Admin dashboard)
```

## 🚀 **Quick Start Commands:**

```bash
# Start with mobile preview info
./mobile-preview.sh

# Or standard development
npm run dev

# Then open: http://localhost:5173
```

## 🎯 **Mobile-First Design Highlights:**

### **📱 Student Experience**
- **Bottom tabs**: Dashboard, Classes, Bookings, Profile
- **One-thumb navigation**: Easy reach on large phones
- **Quick booking**: Direct from class list
- **Visual feedback**: Instant status updates

### **👨‍💼 Admin Experience**  
- **Sidebar navigation**: More space for admin tools
- **Dashboard widgets**: Touch-optimized cards
- **Responsive tables**: Horizontal scroll when needed
- **Quick actions**: Large buttons for common tasks

## 💡 **Pro Tips for Mobile Testing:**

1. **Use real devices** when possible (iPhone/Android)
2. **Test in portrait + landscape** orientations  
3. **Check touch targets** are minimum 44px
4. **Verify text is readable** without zooming
5. **Test with slow connections** (throttling)

Your WellnessHub app is now perfectly optimized for mobile with a sleek dark theme! 🌙📱
