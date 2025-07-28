import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Calendar, CreditCard, Settings, Zap, Clock, CheckCircle, Plus } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Header from '../../components/common/Header';
import BottomNavigation from '../../components/common/BottomNavigation';
import { mockReminders, mockCreditCards, formatCurrency, formatDate, getCreditCardById } from '../../data/mockData';

const RemindersPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [reminders, setReminders] = useState(mockReminders);

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Bills' },
    { id: 'settings', label: 'Reminder Settings' },
    { id: 'auto-pay', label: 'Auto-Pay Setup' }
  ];

  const toggleReminder = (reminderId) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === reminderId 
          ? { ...reminder, isEnabled: !reminder.isEnabled }
          : reminder
      )
    );
  };

  const getUrgencyColor = (daysRemaining) => {
    if (daysRemaining <= 3) return 'text-red-600 bg-red-50 border-red-200';
    if (daysRemaining <= 7) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const renderUpcomingBills = () => (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="bg-white rounded-xl p-4 shadow-card">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{t('billReminder')}</h2>
          <p className="text-gray-600">Track and manage your upcoming payments</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Clock className="text-red-600" size={20} />
            </div>
            <p className="text-lg font-bold text-gray-900">
              {reminders.filter(r => r.daysRemaining <= 7).length}
            </p>
            <p className="text-xs text-gray-600">Due Soon</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Bell className="text-blue-600" size={20} />
            </div>
            <p className="text-lg font-bold text-gray-900">
              {reminders.filter(r => r.isEnabled).length}
            </p>
            <p className="text-xs text-gray-600">Active Reminders</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Zap className="text-green-600" size={20} />
            </div>
            <p className="text-lg font-bold text-gray-900">2</p>
            <p className="text-xs text-gray-600">Auto-Pay Active</p>
          </div>
        </div>
      </div>

      {/* Upcoming Bills List */}
      <div className="space-y-3">
        {reminders.map((reminder) => {
          const card = getCreditCardById(reminder.cardId);
          if (!card) return null;

          return (
            <div key={reminder.id} className="bg-white rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: card.color }}
                >
                  <CreditCard className="text-white" size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{card.bankName}</h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(reminder.daysRemaining)}`}>
                      {reminder.daysRemaining === 0 ? 'Due Today' : 
                       reminder.daysRemaining === 1 ? 'Due Tomorrow' :
                       `${reminder.daysRemaining} days left`}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-gray-600 text-sm">•••• {card.lastFourDigits}</p>
                      <p className="font-bold text-lg">{formatCurrency(reminder.amount)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 text-sm">Due Date</p>
                      <p className="font-medium">{formatDate(reminder.dueDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell size={16} className={reminder.isEnabled ? 'text-primary' : 'text-gray-400'} />
                      <span className="text-sm text-gray-600">
                        {reminder.isEnabled ? 'Reminders On' : 'Reminders Off'}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleReminder(reminder.id)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          reminder.isEnabled
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {reminder.isEnabled ? 'On' : 'Off'}
                      </button>
                      
                      <button
                        onClick={() => navigate('/payment', { 
                          state: { card, paymentType: 'minimum', amount: card.minimumDue } 
                        })}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-600"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-semibold text-blue-900 mb-3">💡 Smart Reminders</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• Get notified 7, 3, and 1 day before due dates</p>
          <p>• SMS and app notifications available</p>
          <p>• Set up auto-pay to never miss payments</p>
          <p>• Customize reminder frequency for each card</p>
        </div>
      </div>
    </div>
  );

  const renderReminderSettings = () => (
    <div className="space-y-4">
      {/* Global Settings */}
      <div className="bg-white rounded-xl p-4 shadow-card">
        <h3 className="font-semibold text-gray-900 mb-4">Global Reminder Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">SMS Alerts</p>
              <p className="text-gray-600 text-sm">Receive SMS reminders</p>
            </div>
            <button className="w-12 h-6 bg-primary rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">App Notifications</p>
              <p className="text-gray-600 text-sm">Push notifications in app</p>
            </div>
            <button className="w-12 h-6 bg-primary rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Reminders</p>
              <p className="text-gray-600 text-sm">Email notifications</p>
            </div>
            <button className="w-12 h-6 bg-gray-300 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Reminder Timing */}
      <div className="bg-white rounded-xl p-4 shadow-card">
        <h3 className="font-semibold text-gray-900 mb-4">Reminder Timing</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="font-medium text-blue-900">7 days before due date</span>
            <CheckCircle className="text-blue-600" size={20} />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="font-medium text-blue-900">3 days before due date</span>
            <CheckCircle className="text-blue-600" size={20} />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="font-medium text-blue-900">1 day before due date</span>
            <CheckCircle className="text-blue-600" size={20} />
          </div>
          
          <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors">
            <Plus size={20} className="mx-auto mb-1" />
            <span className="text-sm">Add Custom Reminder</span>
          </button>
        </div>
      </div>

      {/* Language Settings */}
      <div className="bg-white rounded-xl p-4 shadow-card">
        <h3 className="font-semibold text-gray-900 mb-4">Language Preferences</h3>
        
        <div className="space-y-3">
          <button className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg text-left">
            <p className="font-medium text-blue-900">English</p>
            <p className="text-blue-700 text-sm">Bill Reminder: Don't forget your payment!</p>
          </button>
          
          <button className="w-full p-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50">
            <p className="font-medium text-gray-900">हिंदी</p>
            <p className="text-gray-600 text-sm">बिल रिमाइंडर: बिल भूलना मत, हम याद दिलाएंगे!</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAutoPaySetup = () => (
    <div className="space-y-4">
      {/* Auto-Pay Overview */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <Zap size={32} />
          <div>
            <h2 className="text-xl font-bold">{t('neverMissPayment')}</h2>
            <p className="text-green-100">Set up automatic payments for your cards</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">2</p>
            <p className="text-green-100 text-sm">Cards with Auto-Pay</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">₹0</p>
            <p className="text-green-100 text-sm">Late Fees Saved</p>
          </div>
        </div>
      </div>

      {/* Auto-Pay Cards */}
      <div className="space-y-3">
        {mockCreditCards.map((card) => {
          const hasAutoPay = card.id === 'hdfc-8234' || card.id === 'sbi-9876';
          
          return (
            <div key={card.id} className="bg-white rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: card.color }}
                >
                  <CreditCard className="text-white" size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{card.bankName}</h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      hasAutoPay 
                        ? 'bg-green-50 text-green-600 border border-green-200'
                        : 'bg-gray-50 text-gray-600 border border-gray-200'
                    }`}>
                      {hasAutoPay ? 'Auto-Pay Active' : 'Not Set Up'}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">•••• {card.lastFourDigits}</p>
                  
                  {hasAutoPay ? (
                    <div className="bg-green-50 p-3 rounded-lg mb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-green-900">Auto-Pay: Minimum Amount</p>
                          <p className="text-green-700 text-sm">Every month on due date</p>
                        </div>
                        <Settings className="text-green-600" size={20} />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <p className="text-gray-600 text-sm">Set up auto-pay to never miss payments</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    {hasAutoPay ? (
                      <>
                        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200">
                          Modify
                        </button>
                        <button className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-200">
                          Disable
                        </button>
                      </>
                    ) : (
                      <button className="w-full bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-accent">
                        Set Up Auto-Pay
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Auto-Pay Benefits */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-semibold text-blue-900 mb-3">⚡ Auto-Pay Benefits</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• Never miss a payment deadline</p>
          <p>• Maintain healthy credit score</p>
          <p>• Avoid late payment fees</p>
          <p>• Choose minimum or full amount</p>
          <p>• Cancel anytime with one tap</p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="text-gray-600" size={16} />
          <span className="font-medium text-gray-900">Security & Control</span>
        </div>
        <p className="text-gray-700 text-sm">
          Auto-pay uses secure UPI mandate. You'll receive notifications before each payment. 
          You can modify or cancel auto-pay anytime from this screen.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary pb-20">
      <Header title={t('reminders')} showBack={false} />
      
      <div className="px-4 py-6">
        {/* Tabs */}
        <div className="flex bg-white rounded-xl p-1 mb-6 shadow-card">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'upcoming' && renderUpcomingBills()}
        {activeTab === 'settings' && renderReminderSettings()}
        {activeTab === 'auto-pay' && renderAutoPaySetup()}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default RemindersPage; 