import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageToggle = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card shadow-md shadow-black/5 border border-border/50 
                 hover:shadow-lg hover:shadow-black/10 hover:scale-105 active:scale-95 transition-all duration-200 ${className}`}
      aria-label="Toggle Language"
    >
      <Globe size={16} className="text-muted-foreground" />
      <span className="text-sm font-semibold text-foreground">
        {language === 'en' ? 'हिं' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageToggle; 