import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Gift, Bell, Shield, ArrowRight, CreditCard } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageToggle from '../../components/common/LanguageToggle';

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleGetStarted = () => {
    navigate('/user-type-selection');
  };

  const valueProps = [
    {
      icon: Smartphone,
      title: t('upiPayments'),
      description: '100% secure UPI payments'
    },
    {
      icon: Gift,
      title: t('rewards'),
      description: 'Earn rewards on every payment'
    },
    {
      icon: Bell,
      title: t('autoReminders'),
      description: 'Never miss a due date'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-accent">
      {/* Language Toggle */}
      <div className="flex justify-end p-4 safe-area-top">
        <LanguageToggle className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
      </div>

      <div className="flex flex-col items-center px-6 pb-8">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mt-8 mb-12">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <span className="text-primary font-bold text-2xl">P</span>
          </div>
          <h1 className="text-3xl font-bold text-white text-center mb-2">Pice</h1>
          <p className="text-blue-100 text-center text-lg px-4">
            {t('heroTitle')}
          </p>
        </div>

        {/* Hero Illustration */}
        <div className="w-full max-w-sm mb-12">
          <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <CreditCard className="w-8 h-8 text-white mx-auto mb-2" />
                <span className="text-white text-sm">Credit Cards</span>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <Smartphone className="w-8 h-8 text-white mx-auto mb-2" />
                <span className="text-white text-sm">UPI Payments</span>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <Gift className="w-8 h-8 text-white mx-auto mb-2" />
                <span className="text-white text-sm">Rewards</span>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <Shield className="w-8 h-8 text-white mx-auto mb-2" />
                <span className="text-white text-sm">100% Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="w-full max-w-sm space-y-4 mb-12">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <div key={index} className="flex items-center gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{prop.title}</h3>
                  <p className="text-blue-100 text-sm">{prop.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleGetStarted}
          className="w-full max-w-sm bg-white text-primary font-semibold py-4 px-6 rounded-xl shadow-lg hover:bg-gray-50 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
        >
          {t('getStarted')}
          <ArrowRight size={20} />
        </button>

        {/* Trust Indicators */}
        <div className="flex items-center gap-6 mt-8 text-blue-100 text-sm">
          <div className="flex items-center gap-2">
            <Shield size={16} />
            <span>Bank Grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Indore's #1 Choice</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing; 