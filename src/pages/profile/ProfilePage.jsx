import React from 'react';
import { User, Settings, Bell, Shield, HelpCircle, Globe, LogOut, ChevronRight, CreditCard, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';
import Header from '../../components/common/Header';
import BottomNavigation from '../../components/common/BottomNavigation';

const ProfilePage = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const { user, logout } = useUser();

  const profileSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Personal Information',
          value: user?.name || 'Update Profile',
          onClick: () => {}
        },
        {
          icon: CreditCard,
          label: 'Payment Methods',
          value: '3 cards linked',
          onClick: () => {}
        },
        {
          icon: Star,
          label: 'Credit Score',
          value: '750+',
          onClick: () => {}
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Globe,
          label: t('language'),
          value: language === 'en' ? 'English' : 'हिंदी',
          onClick: toggleLanguage
        },
        {
          icon: Bell,
          label: t('notifications'),
          value: 'Enabled',
          onClick: () => {}
        },
        {
          icon: Shield,
          label: t('security'),
          value: 'Manage',
          onClick: () => {}
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: t('help'),
          value: 'FAQs & Support',
          onClick: () => {}
        },
        {
          icon: Settings,
          label: 'App Settings',
          value: 'Advanced options',
          onClick: () => {}
        }
      ]
    }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-secondary pb-20">
      <Header title={t('profile')} showBack={false} />
      
      <div className="px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <User className="text-white" size={28} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{user?.name || 'User'}</h2>
              <p className="text-gray-600">{user?.phone || '+91 98765 43210'}</p>
              <p className="text-gray-500 text-sm">{user?.city || 'Indore'}</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-1">
                <span className="text-green-600 text-xs font-bold">✓</span>
              </div>
              <p className="text-xs text-gray-600">Verified</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-gray-900">3</p>
                <p className="text-xs text-gray-600">Cards</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">₹1,247</p>
                <p className="text-xs text-gray-600">Rewards</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">24</p>
                <p className="text-xs text-gray-600">Payments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Type Badge */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="text-blue-600" size={20} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-blue-900">
                {user?.userType === 'business' ? 'Business Account' : 'Personal Account'}
              </p>
              <p className="text-blue-700 text-sm">
                {user?.userType === 'business' 
                  ? 'Access to business features and bulk payments'
                  : 'Perfect for managing personal credit cards'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {profileSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 px-2">
              {section.title}
            </h3>
            <div className="bg-white rounded-xl shadow-card overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={item.onClick}
                    className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className="text-gray-600" size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-gray-600 text-sm">{item.value}</p>
                    </div>
                    <ChevronRight className="text-gray-400" size={20} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* App Info */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-card">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Pice App</h3>
            <p className="text-gray-600 text-sm mb-3">
              Business Se Ghar Tak, Secure and rewarding
            </p>
            <p className="text-gray-500 text-xs">Version 1.0.0</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 border border-red-200 text-red-600 py-4 px-6 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Logout
        </button>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">
            Made with ❤️ for Indore
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProfilePage; 