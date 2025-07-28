// Mock Credit Cards Data
export const mockCreditCards = [
  {
    id: 'hdfc-8234',
    bankName: 'HDFC Bank',
    cardType: 'Credit Card',
    lastFourDigits: '8234',
    outstandingAmount: 15450,
    minimumDue: 1500,
    dueDate: '2025-02-15',
    color: '#DC143C',
    logo: 'hdfc'
  },
  {
    id: 'sbi-9876',
    bankName: 'SBI',
    cardType: 'SimplyCLICK Card',
    lastFourDigits: '9876',
    outstandingAmount: 8200,
    minimumDue: 820,
    dueDate: '2025-02-22',
    color: '#1f4788',
    logo: 'sbi'
  },
  {
    id: 'icici-5432',
    bankName: 'ICICI',
    cardType: 'Amazon Pay Card',
    lastFourDigits: '5432',
    outstandingAmount: 3680,
    minimumDue: 368,
    dueDate: '2025-03-08',
    color: '#F37020',
    logo: 'icici'
  }
];

// Mock Transaction History
export const mockTransactions = [
  {
    id: 'txn-001',
    cardId: 'hdfc-8234',
    amount: 5200,
    type: 'payment',
    status: 'completed',
    date: '2025-01-15',
    description: 'HDFC Payment',
    method: 'UPI'
  },
  {
    id: 'txn-002',
    cardId: 'sbi-9876',
    amount: 1800,
    type: 'payment',
    status: 'completed',
    date: '2025-01-12',
    description: 'SBI Payment',
    method: 'UPI'
  },
  {
    id: 'txn-003',
    amount: 52,
    type: 'cashback',
    status: 'completed',
    date: '2025-01-15',
    description: 'Cashback Earned',
    source: 'payment'
  },
  {
    id: 'txn-004',
    cardId: 'icici-5432',
    amount: 4500,
    type: 'payment',
    status: 'completed',
    date: '2025-01-08',
    description: 'ICICI Payment',
    method: 'UPI'
  },
  {
    id: 'txn-005',
    amount: 100,
    type: 'reward_redeemed',
    status: 'completed',
    date: '2025-01-05',
    description: 'Amazon Gift Card',
    source: 'redemption'
  }
];

// Mock Rewards Data
export const mockRewards = {
  totalEarned: 1247,
  availableToRedeem: 342,
  thisMonth: 156,
  lastMonth: 89,
  breakdown: [
    { source: 'Credit Card Payments', amount: 890 },
    { source: 'Local Offers', amount: 234 },
    { source: 'Referral Bonus', amount: 123 }
  ]
};

// Mock Local Deals (Indore-specific)
export const mockLocalDeals = [
  {
    id: 'deal-001',
    business: 'Sarafa Bazaar',
    offer: '10% off food orders',
    description: 'Famous night food market',
    cashback: '10%',
    minOrder: 200,
    category: 'food',
    image: '🍛',
    validTill: '2025-03-31'
  },
  {
    id: 'deal-002',
    business: 'Rajwada Shopping',
    offer: '5% cashback',
    description: 'Traditional shopping center',
    cashback: '5%',
    minOrder: 500,
    category: 'shopping',
    image: '🛍️',
    validTill: '2025-02-28'
  },
  {
    id: 'deal-003',
    business: 'Indore Central Mall',
    offer: 'Gift vouchers',
    description: 'Premium shopping destination',
    cashback: '₹100 voucher',
    minOrder: 2000,
    category: 'shopping',
    image: '🎁',
    validTill: '2025-04-15'
  },
  {
    id: 'deal-004',
    business: 'Local Restaurants',
    offer: 'Discount coupons',
    description: 'Multiple restaurant partners',
    cashback: '15%',
    minOrder: 300,
    category: 'food',
    image: '🍽️',
    validTill: '2025-03-15'
  }
];

// Mock Gift Cards
export const mockGiftCards = [
  {
    id: 'gift-001',
    brand: 'Amazon',
    cashback: '2%',
    minAmount: 100,
    maxAmount: 10000,
    category: 'ecommerce',
    image: '📦'
  },
  {
    id: 'gift-002',
    brand: 'Flipkart',
    cashback: '1.5%',
    minAmount: 100,
    maxAmount: 5000,
    category: 'ecommerce',
    image: '🛒'
  },
  {
    id: 'gift-003',
    brand: 'AND Clothing',
    cashback: '3%',
    minAmount: 500,
    maxAmount: 3000,
    category: 'fashion',
    image: '👗'
  },
  {
    id: 'gift-004',
    brand: 'AJIO',
    cashback: '5%',
    minAmount: 500,
    maxAmount: 2000,
    category: 'fashion',
    image: '👔'
  },
  {
    id: 'gift-005',
    brand: 'PVR Cinemas',
    cashback: '₹50 off',
    minAmount: 200,
    maxAmount: 1000,
    category: 'entertainment',
    image: '🎬'
  }
];

// Mock Reminders
export const mockReminders = [
  {
    id: 'reminder-001',
    cardId: 'hdfc-8234',
    amount: 15450,
    dueDate: '2025-02-15',
    daysRemaining: 18,
    isEnabled: true,
    reminderDays: [7, 3, 1]
  },
  {
    id: 'reminder-002',
    cardId: 'sbi-9876',
    amount: 8200,
    dueDate: '2025-02-22',
    daysRemaining: 25,
    isEnabled: true,
    reminderDays: [7, 3, 1]
  },
  {
    id: 'reminder-003',
    cardId: 'icici-5432',
    amount: 3680,
    dueDate: '2025-03-08',
    daysRemaining: 39,
    isEnabled: false,
    reminderDays: [7, 3, 1]
  }
];

// Mock User Profile
export const mockUserProfile = {
  name: 'Rahul Sharma',
  phone: '+91 98765 43210',
  city: 'Indore',
  userType: 'personal', // 'personal' or 'business'
  creditScore: 750,
  joinedDate: '2024-12-01',
  totalCards: 3,
  totalPayments: 24,
  preferredLanguage: 'en'
};

// Mock Business Profile (for MSME users)
export const mockBusinessProfile = {
  businessName: 'Sharma Enterprises',
  businessType: 'Retail',
  gstNumber: 'GST123456789',
  monthlyVolume: 150000,
  businessCategory: 'Electronics',
  employees: 15,
  registrationDate: '2020-05-15'
};

// Mock Festive Offers
export const mockFestiveOffers = [
  {
    id: 'festive-001',
    title: 'Festival Special',
    description: '5x rewards on payments above ₹10,000',
    multiplier: 5,
    minAmount: 10000,
    validTill: '2025-03-15',
    termsAndConditions: [
      'Valid on all credit card payments',
      'Maximum cashback: ₹500',
      'Offer valid till March 15, 2025',
      'T&C apply'
    ]
  }
];

// Mock Notification Settings
export const mockNotificationSettings = {
  smsAlerts: true,
  appNotifications: true,
  emailReminders: false,
  languagePreference: 'en',
  reminderDays: [7, 3, 1],
  autoPayEnabled: false
};

// Helper functions
export const getCreditCardById = (id) => {
  return mockCreditCards.find(card => card.id === id);
};

export const getTransactionsByCardId = (cardId) => {
  return mockTransactions.filter(txn => txn.cardId === cardId);
};

export const getUpcomingReminders = () => {
  return mockReminders
    .filter(reminder => reminder.isEnabled && reminder.daysRemaining <= 30)
    .sort((a, b) => a.daysRemaining - b.daysRemaining);
};

export const getTotalOutstanding = () => {
  return mockCreditCards.reduce((total, card) => total + card.outstandingAmount, 0);
};

export const getRecentTransactions = (limit = 5) => {
  return mockTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const getDaysUntilDue = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const timeDiff = due.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}; 