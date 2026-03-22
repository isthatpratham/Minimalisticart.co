import React, { useState } from 'react';
import { Menu, X, LogOut, LayoutGrid, Layers, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = ({ activeTab, setActiveTab, onLogout, isOffline }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'products', label: 'Gallery', icon: LayoutGrid },
    { id: 'categories', label: 'Categories', icon: Layers }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsOpen(false); // Close mobile menu after selection
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo/Title Section */}
      <div className="px-6 py-8 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div className={`transition-all duration-300 ${isCollapsed ? 'hidden' : ''}`}>
            <h1 className="font-serif text-lg font-semibold tracking-tight text-brand-dark dark:text-brand-light">
              Artisan
            </h1>
            <p className="text-xs text-brand-dark/50 dark:text-brand-light/50 font-light">Portal</p>
          </div>
          {!isCollapsed && (
            <div className="w-2 h-2 rounded-full bg-brand-accent/40"></div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group relative overflow-hidden ${
                isActive
                  ? 'bg-brand-accent/10 dark:bg-brand-accent/5 text-brand-accent'
                  : 'text-brand-dark/60 dark:text-brand-light/60 hover:text-brand-dark dark:hover:text-brand-light hover:bg-black/2 dark:hover:bg-white/5'
              }`}
            >
              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent rounded-r-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                />
              )}

              <Icon
                size={20}
                className={`flex-shrink-0 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'group-hover:scale-105'
                }`}
              />

              {!isCollapsed && (
                <>
                  <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                  {isActive && (
                    <ChevronRight
                      size={16}
                      className="opacity-50 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Offline Badge */}
      {isOffline && (
        <div className="mx-3 mb-4 px-3 py-2 bg-brand-accent/10 dark:bg-brand-accent/5 rounded-xl border border-brand-accent/20 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
            Offline Mode
          </p>
        </div>
      )}

      {/* Logout Button */}
      <div className="px-3 pb-6 border-t border-black/5 dark:border-white/5 pt-4">
        <motion.button
          onClick={onLogout}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500/70 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 group"
        >
          <LogOut size={20} className="flex-shrink-0 group-hover:scale-105 transition-transform" />
          {!isCollapsed && (
            <span className="text-sm font-medium flex-1 text-left">Logout</span>
          )}
        </motion.button>
      </div>

      {/* Collapse Toggle (Desktop) */}
      <div className="hidden md:flex px-3 pb-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full py-2 text-xs opacity-40 hover:opacity-60 transition-opacity font-medium uppercase tracking-wider"
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? '80px' : '280px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden md:flex fixed left-0 top-0 h-screen z-40 flex-col bg-white dark:bg-[#0a0a0a] border-r border-black/5 dark:border-white/5 shadow-xl"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 text-brand-dark dark:text-brand-light hover:shadow-lg transition-all"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 h-screen w-72 z-40 flex flex-col bg-white dark:bg-[#0a0a0a] border-r border-black/5 dark:border-white/5 shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for desktop layout (adjusts content position) */}
      <div
        className="hidden md:block transition-all duration-300"
        style={{ width: isCollapsed ? '80px' : '280px' }}
      />
    </>
  );
};

export default AdminSidebar;
