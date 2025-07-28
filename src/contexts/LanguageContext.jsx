import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to English
    return localStorage.getItem('pice-language') || 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('pice-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key) => {
    return translations[language][key] || translations.en[key] || key;
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isHindi: language === 'hi'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translations object
const translations = {
  en: {
    // Landing/Hero
    heroTitle: "Business Se Ghar Tak, Secure and rewarding",
    getStarted: "Get Started",
    upiPayments: "UPI Payments",
    rewards: "Rewards",
    autoReminders: "Auto-reminders",
    
    // User Type Selection
    chooseAccountType: "Choose your account type",
    personalUser: "Personal User",
    businessMSME: "Business/MSME",
    manageCards: "Manage your credit cards",
    businessPayments: "Business bill payments",
    
    // Dashboard
    welcome: "Welcome",
    totalCards: "Total Cards",
    thisMonth: "This Month",
    rewardsEarned: "Rewards Earned",
    payBills: "Pay Bills",
    reminders: "Reminders",
    recentTransactions: "Recent Transactions",
    
    // Navigation
    home: "Home",
    cards: "Cards",
    profile: "Profile",
    
    // Common
    continue: "Continue",
    back: "Back",
    next: "Next",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    
    // Credit Cards
    yourCreditCards: "Your Credit Cards",
    outstandingAmount: "Outstanding Amount",
    dueDate: "Due Date",
    payNow: "Pay Now",
    addNewCard: "Add New Card",
    
    // Payment
    paySecurely: "Pay Securely with UPI",
    fullAmount: "Full Amount",
    minimumAmount: "Minimum Amount",
    customAmount: "Custom Amount",
    securePayment: "100% Secure",
    encryption: "256-bit encryption",
    
    // Rewards
    totalEarned: "Total Earned",
    availableToRedeem: "Available to Redeem",
    localDeals: "Local Deals",
    giftCards: "Gift Cards",
    cashback: "Cashback",
    indoreOffers: "Indore Special Offers",
    
    // Reminders
    billReminder: "Aapka bill, Hamari Zimmedari",
    upcomingBills: "Upcoming Bills",
    setReminder: "Set Reminder",
    autoPaySetup: "Auto-Pay Setup",
    neverMissPayment: "Never miss a payment",
    
    // Profile
    accountType: "Account Type",
    language: "Language",
    notifications: "Notifications",
    security: "Security",
    help: "Help"
  },
  hi: {
    // Landing/Hero
    heroTitle: "व्यापार से घर तक, सुरक्षित और फायदेमंद",
    getStarted: "शुरू करें",
    upiPayments: "UPI भुगतान",
    rewards: "रिवॉर्ड्स",
    autoReminders: "ऑटो-रिमाइंडर",
    
    // User Type Selection
    chooseAccountType: "अपना खाता प्रकार चुनें",
    personalUser: "व्यक्तिगत उपयोगकर्ता",
    businessMSME: "व्यापार/MSME",
    manageCards: "अपने क्रेडिट कार्ड प्रबंधित करें",
    businessPayments: "व्यापारिक बिल भुगतान",
    
    // Dashboard
    welcome: "स्वागत",
    totalCards: "कुल कार्ड",
    thisMonth: "इस महीने",
    rewardsEarned: "रिवॉर्ड्स अर्जित",
    payBills: "बिल भुगतान",
    reminders: "रिमाइंडर",
    recentTransactions: "हाल के लेनदेन",
    
    // Navigation
    home: "होम",
    cards: "कार्ड्स",
    profile: "प्रोफाइल",
    
    // Common
    continue: "जारी रखें",
    back: "वापस",
    next: "अगला",
    save: "सेव करें",
    cancel: "रद्द करें",
    loading: "लोड हो रहा है...",
    
    // Credit Cards
    yourCreditCards: "आपके क्रेडिट कार्ड",
    outstandingAmount: "बकाया राशि",
    dueDate: "नियत तारीख",
    payNow: "अभी भुगतान करें",
    addNewCard: "नया कार्ड जोड़ें",
    
    // Payment
    paySecurely: "UPI के साथ सुरक्षित भुगतान",
    fullAmount: "पूरी राशि",
    minimumAmount: "न्यूनतम राशि",
    customAmount: "कस्टम राशि",
    securePayment: "100% सुरक्षित",
    encryption: "256-बिट एन्क्रिप्शन",
    
    // Rewards
    totalEarned: "कुल अर्जित",
    availableToRedeem: "रिडीम के लिए उपलब्ध",
    localDeals: "स्थानीय डील्स",
    giftCards: "गिफ्ट कार्ड्स",
    cashback: "कैशबैक",
    indoreOffers: "इंदौर विशेष ऑफर",
    
    // Reminders
    billReminder: "आपका बिल, हमारी जिम्मेदारी",
    upcomingBills: "आगामी बिल",
    setReminder: "रिमाइंडर सेट करें",
    autoPaySetup: "ऑटो-पे सेटअप",
    neverMissPayment: "कभी भुगतान न चूकें",
    
    // Profile
    accountType: "खाता प्रकार",
    language: "भाषा",
    notifications: "सूचनाएं",
    security: "सुरक्षा",
    help: "सहायता"
  }
};

export default LanguageContext; 