import React, { useState } from 'react';
import { Gift, MapPin, CreditCard, Star, ExternalLink, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Header from '../../components/common/Header';
import BottomNavigation from '../../components/common/BottomNavigation';
import { mockRewards, mockLocalDeals, mockGiftCards, formatCurrency } from '../../data/mockData';

const RewardsPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'local', label: t('localDeals') },
    { id: 'gifts', label: t('giftCards') },
    { id: 'cashback', label: t('cashback') }
  ];

  const renderLocalDeals = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl">
        <h3 className="font-bold mb-1">{t('indoreOffers')} 🏛️</h3>
        <p className="text-orange-100 text-sm">Exclusive deals for Indore residents</p>
      </div>

      {mockLocalDeals.map((deal) => (
        <div key={deal.id} className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="text-2xl">{deal.image}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{deal.business}</h3>
                <span className="text-green-600 font-bold">{deal.cashback}</span>
              </div>
              <p className="text-primary font-medium mb-1">{deal.offer}</p>
              <p className="text-gray-600 text-sm mb-2">{deal.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Min order: ₹{deal.minOrder}</span>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>Till {deal.validTill}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGiftCards = () => (
    <div className="grid grid-cols-2 gap-4">
      {mockGiftCards.map((gift) => (
        <div key={gift.id} className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
          <div className="text-center">
            <div className="text-3xl mb-2">{gift.image}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{gift.brand}</h3>
            <p className="text-primary font-bold mb-2">{gift.cashback}</p>
            <p className="text-xs text-gray-600 mb-3">
              ₹{gift.minAmount} - ₹{gift.maxAmount}
            </p>
            <button className="w-full bg-primary text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
              Redeem
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCashback = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-card">
        <h3 className="font-semibold text-gray-900 mb-4">Cashback Breakdown</h3>
        {mockRewards.breakdown.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <span className="text-gray-700">{item.source}</span>
            <span className="font-semibold text-gray-900">{formatCurrency(item.amount)}</span>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl">
        <h3 className="font-bold mb-2">🎉 Festive Bonus!</h3>
        <p className="text-green-100 text-sm mb-3">
          Earn 5x rewards on payments above ₹10,000
        </p>
        <button className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );

  const renderAllContent = () => (
    <div className="space-y-6">
      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-card text-center">
          <Star className="text-yellow-500 mx-auto mb-2" size={24} />
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockRewards.availableToRedeem)}</p>
          <p className="text-gray-600 text-sm">{t('availableToRedeem')}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-card text-center">
          <Gift className="text-purple-500 mx-auto mb-2" size={24} />
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockRewards.thisMonth)}</p>
          <p className="text-gray-600 text-sm">{t('thisMonth')}</p>
        </div>
      </div>

      {/* Featured local deal */}
      <div className="bg-white rounded-xl p-4 shadow-card">
        <h3 className="font-semibold text-gray-900 mb-3">🔥 Featured Deal</h3>
        <div className="flex items-center gap-4">
          <div className="text-3xl">🍛</div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">Sarafa Bazaar</h4>
            <p className="text-primary font-medium">10% off food orders</p>
            <p className="text-gray-600 text-sm">Famous night food market</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
            Claim
          </button>
        </div>
      </div>

      {/* Top gift cards */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Popular Gift Cards</h3>
        <div className="grid grid-cols-3 gap-3">
          {mockGiftCards.slice(0, 3).map((gift) => (
            <div key={gift.id} className="bg-white rounded-xl p-3 shadow-card text-center">
              <div className="text-2xl mb-1">{gift.image}</div>
              <p className="text-xs font-medium text-gray-900">{gift.brand}</p>
              <p className="text-xs text-primary font-bold">{gift.cashback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary pb-20">
      <Header title={t('rewards')} showBack={false} />
      
      <div className="px-4 py-6">
        {/* Rewards Summary */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-card">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              {formatCurrency(mockRewards.totalEarned)}
            </h2>
            <p className="text-gray-600 mb-4">{t('totalEarned')}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-blue-600 font-semibold">{formatCurrency(mockRewards.availableToRedeem)}</p>
                <p className="text-blue-600 text-xs">{t('availableToRedeem')}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-green-600 font-semibold">{formatCurrency(mockRewards.thisMonth)}</p>
                <p className="text-green-600 text-xs">{t('thisMonth')}</p>
              </div>
            </div>
          </div>
        </div>

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
        {activeTab === 'all' && renderAllContent()}
        {activeTab === 'local' && renderLocalDeals()}
        {activeTab === 'gifts' && renderGiftCards()}
        {activeTab === 'cashback' && renderCashback()}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default RewardsPage; 