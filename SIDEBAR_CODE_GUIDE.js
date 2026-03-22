import React, { useState } from 'react';
import { Menu, X, LogOut, LayoutGrid, Layers, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * COMPLETE STANDALONE IMPLEMENTATION GUIDE
 * ==========================================
 * If you prefer a fully self-contained example without using components,
 * here's the complete standalone code that can be used in a single file.
 */

/**
 * STEP-BY-STEP INTEGRATION INSTRUCTIONS
 * =======================================
 * 1. Copy AdminSidebar.jsx to: src/components/Admin/AdminSidebar.jsx
 * 2. Update AdminDashboard.jsx (see lines below)
 * 3. (Optional) Import AdminSidebar.css for extra animations
 * 4. Ensure these dependencies are installed:
 *    - react
 *    - framer-motion
 *    - lucide-react
 *    - tailwind-css
 * 5. Verify Tailwind config includes dark mode
 */

// ============================================
// REQUIRED IMPORTS IN AdminDashboard.jsx
// ============================================

/*
import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Upload, X } from 'lucide-react';
import AdminSidebar from './AdminSidebar';  // ← NEW IMPORT
*/

// ============================================
// LAYOUT STRUCTURE (in AdminDashboard JSX return)
// ============================================

const LayoutStructure = () => (
  <div className="flex min-h-screen bg-brand-light dark:bg-brand-dark">
    {/* Sidebar Component */}
    <AdminSidebar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={onLogout}
      isOffline={user.is_offline}
    />

    {/* Main Content Area */}
    <div className="flex-1 flex flex-col w-full">
      {/* Mobile spacing */}
      <div className="md:hidden h-20" />

      {/* Offline Banner */}
      {user.is_offline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-accent text-white py-3 px-4 text-center text-[10px] uppercase tracking-[0.3em] font-bold"
        >
          ⚠️ Emergency Offline Mode
        </motion.div>
      )}

      <main className="flex-1 px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        {/* Your content goes here */}
      </main>
    </div>
  </div>
);

// ============================================
// TAILWIND CONFIG REQUIREMENTS
// ============================================

/*
In tailwind.config.js, ensure you have:

export default {
  darkMode: 'class',  // ← Required for dark mode
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#fafaf9',    // or your light color
          dark: '#1a1a1a',     // or your dark color
          accent: '#d97706',   // or your accent color
        }
      }
    }
  }
}
*/

// ============================================
// USAGE EXAMPLE - Complete Component
// ============================================

const AdminDashboardExample = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('products');
  
  return (
    <div className="flex min-h-screen bg-brand-light dark:bg-brand-dark">
      {/* Sidebar - pass required props */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
        isOffline={user.is_offline}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <div className="md:hidden h-20" />
        
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-8 sm:py-12">
          <h1>Manage {activeTab}</h1>
          {/* Your dashboard content */}
        </main>
      </div>
    </div>
  );
};

// ============================================
// CUSTOMIZATION EXAMPLES
// ============================================

// Example 1: Add menu items to sidebar
const CustomMenuExample = () => (
  /*
  In AdminSidebar.jsx, modify the menuItems array:
  
  const menuItems = [
    { id: 'products', label: 'Gallery', icon: LayoutGrid },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },  // NEW
    { id: 'settings', label: 'Settings', icon: Settings },     // NEW
  ];
  */
  <div>Example - See AdminSidebar.jsx menuItems array</div>
);

// Example 2: Change sidebar width
const ChangeWidthExample = () => (
  /*
  In AdminSidebar.jsx, update the animate property:
  
  <motion.aside
    animate={{ width: isCollapsed ? '60px' : '300px' }}  // Changed from 80px/280px
    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    className="hidden md:flex fixed left-0 top-0 h-screen z-40 flex-col..."
  >
  */
  <div>Example - See AdminSidebar.jsx motion.aside element</div>
);

// Example 3: Modify colors for dark mode
const ColorCustomizationExample = () => (
  /*
  Update className props in AdminSidebar.jsx:
  
  // Change sidebar background
  className="... bg-slate-50 dark:bg-slate-900"
  
  // Change text colors
  className="... text-slate-700 dark:text-slate-200"
  
  // Change hover state
  className="... hover:bg-slate-100 dark:hover:bg-slate-800"
  */
  <div>Example - Update className props</div>
);

// ============================================
// MOBILE MENU INTERACTION FLOW
// ============================================

/*
USER ACTIONS:
1. User clicks hamburger button
   ↓
2. setIsOpen(true) 
   ↓
3. Backdrop reveals with fade animation
4. Sidebar slides in from left
   ↓
5. User clicks menu item
   ↓
6. setActiveTab() updates
7. setIsOpen(false) closes menu
   ↓
8. Sidebar slides out
9. Backdrop fades out

OR User clicks overlay:
   ↓
6. setIsOpen(false)
   ↓
7-9. (Same as above)
*/

// ============================================
// DESKTOP BEHAVIOR
// ============================================

/*
USER ACTIONS:
1. Sidebar is always visible (fixed position)
   ↓
2. User hovers over menu item
   ↓
3. Item shows hover state (background change)
   ↓
4. User clicks menu item
   ↓
5. setActiveTab() updates
6. Active indicator animates
   ↓
7. (Optional) User clicks collapse button
   ↓
8. setIsCollapsed(true)
9. Main content shifts right
10. Icons-only mode activates
*/

// ============================================
// RESPONSIVE BREAKPOINTS
// ============================================

/*
TAILWIND BREAKPOINTS USED:
- md: (768px) - Desktop breakpoint where sidebar becomes fixed
- sm: (640px) - Small tablet
- Default: Mobile (< 640px)

KEY RESPONSIVE CLASSES:
- hidden md:flex    → Hidden on mobile, visible on desktop
- md:hidden         → Visible on mobile, hidden on desktop
- flex-col sm:flex-row → Column on mobile, row on tablet+
- px-4 sm:px-6 md:px-8 → Progressive padding
- text-lg sm:text-xl   → Progressive font sizing
*/

// ============================================
// ANIMATION CONFIGURATION
// ============================================

/*
FRAMER MOTION ANIMATIONS:

1. Sidebar Slide (Mobile)
   initial={{ x: -280 }}
   animate={{ x: 0 }}
   transition={{ type: 'spring', stiffness: 300, damping: 30 }}
   
   Elasticity: 0 (stiff), 400+ (bouncy)
   Damping: Lower = more bouncy

2. Backdrop Fade
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   exit={{ opacity: 0 }}
   
3. Menu Item Hover
   whileHover={{ x: 4 }}
   whileTap={{ scale: 0.98 }}

4. Width Transition (Desktop collapse)
   animate={{ width: isCollapsed ? '80px' : '280px' }}
   transition={{ type: 'spring', stiffness: 300, damping: 30 }}
*/

// ============================================
// ACCESSIBILITY FEATURES
// ============================================

const AccessibilityFeatures = () => (
  /*
  KEYBOARD NAVIGATION:
  - Tab: Navigate menu items
  - Enter/Space: Activate button
  - ESC: Close mobile menu (implement with useEffect)
  
  SCREEN READER SUPPORT:
  - <nav> semantic element
  - <button> with proper aria-label
  - aria-label="Toggle menu"
  - role="menuitem" on nav items
  
  TOUCH TARGETS:
  - Min 48px height on mobile
  - Min 44px width on mobile
  - Adequate spacing between items
  
  CONTRAST:
  - 4.5:1 text/background ratio
  - Meets WCAG AA standards
  
  MOTION:
  - Respects prefers-reduced-motion
  - Smooth, not jarring transitions
  */
  <div>See AdminSidebar.jsx for implementation</div>
);

// ============================================
// DARK MODE IMPLEMENTATION
// ============================================

/*
TAILWIND DARK MODE:
Add to HTML element: <html class="dark">

Or use JavaScript:
document.documentElement.classList.add('dark')
document.documentElement.classList.remove('dark')

DARK MODE CLASSES:
- bg-white dark:bg-[#0a0a0a]
- text-brand-dark dark:text-brand-light
- border-black/5 dark:border-white/5
- hover:bg-gray-50 dark:hover:bg-white/5

The sidebar automatically adapts to dark mode!
*/

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

/*
GPU ACCELERATION:
- Uses transform animations (GPU accelerated)
- No layout thrashing
- Smooth 60fps animations

RENDER OPTIMIZATION:
- Memoization on icons (if needed)
- AnimatePresence prevents unmount flicker
- Framer Motion handles efficient updates

CSS OPTIMIZATION:
- Tailwind purges unused styles
- Minimal CSS in AdminSidebar.css (optional)
- No unnecessary repaints
*/

// ============================================
// TESTING CHECKLIST
// ============================================

const TestingChecklist = () => (
  /*
  VISUAL TESTS:
  ✓ Sidebar aligns to left on desktop
  ✓ Content shifts right on desktop
  ✓ Mobile hamburger visible on < 768px
  ✓ Sidebar slides smoothly on mobile
  ✓ Active state highlights correctly
  ✓ Hover effects work
  ✓ Dark mode displays properly
  ✓ Offline badge shows when needed
  
  FUNCTIONAL TESTS:
  ✓ Click hamburger opens menu
  ✓ Click backdrop closes menu
  ✓ Click menu item closes drawer
  ✓ Click menu item sets active tab
  ✓ Collapse button works on desktop
  ✓ Logout button calls onLogout
  ✓ Navigation updates content
  
  RESPONSIVE TESTS:
  ✓ Mobile (320px, 480px)
  ✓ Tablet (640px, 768px)
  ✓ Desktop (1024px, 1280px)
  ✓ Large desktop (1920px+)
  
  ACCESSIBILITY TESTS:
  ✓ Tab navigation works
  ✓ Button roles correct
  ✓ ARIA labels present
  ✓ Sufficient contrast
  ✓ Screen reader compatible
  */
  <div>See SIDEBAR_IMPLEMENTATION.md for details</div>
);

export default {
  LayoutStructure,
  AdminDashboardExample,
  AccessibilityFeatures,
  TestingChecklist,
};
