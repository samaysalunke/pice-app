import React from 'react';
import { Home, CreditCard, Gift, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const tabs = [
    {
      id: 'home',
      label: t('home'),
      icon: Home,
      path: '/dashboard'
    },
    {
      id: 'cards',
      label: t('cards'),
      icon: CreditCard,
      path: '/cards'
    },
    {
      id: 'rewards',
      label: t('rewards'),
      icon: Gift,
      path: '/rewards'
    },
    {
      id: 'profile',
      label: t('profile'),
      icon: User,
      path: '/profile'
    }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path || 
           (path === '/dashboard' && location.pathname === '/');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/50 safe-area-bottom shadow-lg shadow-black/10">
      <div className="flex px-2 py-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.path)}
              className={`nav-item flex-1 ${
                active ? 'nav-item-active' : 'text-muted-foreground hover:text-foreground'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-1 transition-all duration-200 ${
                active 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                  : 'hover:bg-muted'
              }`}>
                <Icon 
                  size={20} 
                  className={`transition-all duration-200 ${
                    active ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}
                />
              </div>
              <span className={`text-xs font-semibold transition-all duration-200 ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation; 