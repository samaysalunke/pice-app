import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Gift, Bell, Plus, ArrowRight, TrendingUp, Sparkles, CreditCard } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';
import Header from '../../components/common/Header';
import BottomNavigation from '../../components/common/BottomNavigation';
import { mockCreditCards, mockRewards, getRecentTransactions, formatCurrency, formatDate, getTotalOutstanding } from '../../data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useUser();

  const totalOutstanding = getTotalOutstanding();
  const recentTransactions = getRecentTransactions(4);

  const stats = [
    {
      title: t('totalCards'),
      value: mockCreditCards.length,
      icon: CreditCard,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: t('thisMonth'),
      value: formatCurrency(11500),
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: t('rewardsEarned'),
      value: formatCurrency(mockRewards.thisMonth),
      icon: Sparkles,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const actionCards = [
    {
      id: 'pay-bills',
      title: t('payBills'),
      subtitle: 'Quick & Secure',
      icon: Smartphone,
      gradient: 'from-blue-500 to-blue-600',
      path: '/cards'
    },
    {
      id: 'rewards',
      title: t('rewards'),
      subtitle: 'Earn Cashback',
      icon: Gift,
      gradient: 'from-orange-500 to-orange-600',
      path: '/rewards'
    },
    {
      id: 'reminders',
      title: t('reminders'),
      subtitle: 'Never Miss Due',
      icon: Bell,
      gradient: 'from-green-500 to-green-600',
      path: '/reminders'
    }
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  const handleTransactionClick = () => {
    navigate('/transactions');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-20">
      <Header title="" showBack={false} />
      
      <div className="px-6 py-8 space-y-8">
        {/* Welcome Section with Enhanced Design */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
              <span className="text-white font-bold text-lg">👋</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('welcome')}, {user?.name || 'User'}!
              </h1>
              <p className="text-muted-foreground font-medium">
                Here's your financial overview
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="stat-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
                <p className="text-xs text-muted-foreground font-medium mb-1">{stat.title}</p>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Enhanced Outstanding Amount Alert */}
        {totalOutstanding > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6 shadow-lg shadow-orange-500/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Bell className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-orange-800 font-bold text-lg mb-1">Total Outstanding</p>
                <p className="text-orange-700 font-medium">{formatCurrency(totalOutstanding)} across {mockCreditCards.length} cards</p>
              </div>
              <button
                onClick={() => navigate('/cards')}
                className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center hover:bg-orange-200 transition-colors"
              >
                <ArrowRight size={20} className="text-orange-600" />
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Action Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            {actionCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={() => handleActionClick(card.path)}
                  className={`bg-gradient-to-r ${card.gradient} text-white p-6 rounded-2xl shadow-lg shadow-black/10 
                           hover:shadow-xl hover:shadow-black/20 hover:scale-[1.02] active:scale-[0.98] 
                           transition-all duration-200 ease-out animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-bold mb-1">{card.title}</h3>
                      <p className="text-white/80 font-medium">{card.subtitle}</p>
                    </div>
                    <ArrowRight size={20} className="text-white/80" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Enhanced Recent Transactions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">{t('recentTransactions')}</h2>
            <button 
              onClick={handleTransactionClick}
              className="text-primary font-semibold hover:text-primary/80 text-sm flex items-center gap-1 transition-colors"
            >
              View All
              <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="bg-card rounded-2xl shadow-lg shadow-black/5 overflow-hidden border border-border/50">
            {recentTransactions.map((transaction, index) => (
              <div key={transaction.id} className="transaction-item">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${
                    transaction.type === 'payment' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : transaction.type === 'cashback'
                      ? 'bg-gradient-to-br from-green-500 to-green-600'
                      : 'bg-gradient-to-br from-purple-500 to-purple-600'
                  }`}>
                    {transaction.type === 'payment' ? (
                      <Smartphone size={20} className="text-white" />
                    ) : transaction.type === 'cashback' ? (
                      <TrendingUp size={20} className="text-white" />
                    ) : (
                      <Gift size={20} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${
                    transaction.type === 'payment' 
                      ? 'text-foreground' 
                      : 'text-green-600'
                  }`}>
                    {transaction.type === 'payment' ? '-' : '+'}{formatCurrency(transaction.amount)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === 'Completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {transaction.status === 'Completed' ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Local Offers Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-purple-500/25">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-yellow-300" />
                <h3 className="font-bold text-lg">Indore Special Offers!</h3>
              </div>
              <p className="text-purple-100 font-medium">15+ local deals available</p>
            </div>
            <button 
              onClick={() => navigate('/rewards')}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl text-sm font-semibold 
                       hover:bg-white/30 transition-all duration-200 border border-white/30"
            >
              Explore
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard; 