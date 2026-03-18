import React, { useState, useEffect } from 'react';
import './index.css';
import { StoreProvider } from './context/StoreContext';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Gallery from './components/Gallery';
import FeaturedBenefits from './components/FeaturedBenefits';
import HowItWorks from './components/HowItWorks';
import Crafter from './components/Crafter';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  const [view, setView] = useState('home');
  const [adminUser, setAdminUser] = useState(null);
  const [theme, setTheme] = useState('light'); // light, dark, beige, sage

  const themes = ['light', 'dark', 'beige', 'sage'];
  const cycleTheme = () => {
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setView('admin');
    }
  }, []);

  return (
    <div className={theme}>
      <StoreProvider>
        <Navbar currentTheme={theme} onThemeCycle={cycleTheme} />
        
        {view === 'home' ? (
          <main>
            <Hero />
            <Categories />
            <FeaturedBenefits />
            <Gallery />
            <HowItWorks />
            <Crafter />
            <CTA />
          </main>
        ) : (
          <div className="pt-24 min-h-screen">
            {!adminUser ? (
              <AdminLogin onLogin={setAdminUser} onBack={() => setView('home')} />
            ) : (
              <AdminDashboard user={adminUser} onLogout={() => {
                supabase.auth.signOut();
                setAdminUser(null);
                setView('home');
              }} />
            )}
          </div>
        )}
        <Footer onAdminClick={() => setView('admin')} />
      </StoreProvider>
    </div>
  );
}

export default App;
