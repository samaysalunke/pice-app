import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';

const Header = ({ title, showBack = false, showLanguageToggle = true, className = '' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className={`bg-card/80 backdrop-blur-xl border-b border-border/50 safe-area-top shadow-sm ${className}`}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-2xl bg-muted hover:bg-muted/80 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft size={20} className="text-muted-foreground" />
            </button>
          )}
          {title ? (
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gradient">Pice</span>
                <span className="text-xs text-muted-foreground font-medium">Credit Card Payments</span>
              </div>
            </div>
          )}
        </div>
        
        {showLanguageToggle && (
          <div className="flex items-center gap-2">
            <LanguageToggle />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 