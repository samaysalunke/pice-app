import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, CreditCard as CreditCardIcon, TrendingUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Header from '../../components/common/Header';
import BottomNavigation from '../../components/common/BottomNavigation';
import CreditCardComponent from '../../components/cards/CreditCardComponent';
import { mockCreditCards } from '../../data/mockData';

const CardsList = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleCardPayment = (card, paymentType) => {
    navigate('/payment', { 
      state: { 
        card, 
        paymentType,
        amount: paymentType === 'minimum' ? card.minimumDue : card.outstandingAmount
      } 
    });
  };

  const handleAddCard = () => {
    navigate('/add-card');
  };

  const totalDue = mockCreditCards.reduce((total, card) => total + card.outstandingAmount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-20">
      <Header title={t('yourCreditCards')} showBack={false} />
      
      <div className="px-6 py-8 space-y-8">
        {/* Enhanced Cards List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">Your Cards</h2>
          {mockCreditCards.map((card, index) => (
            <div key={card.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CreditCardComponent
                card={card}
                onClick={handleCardPayment}
                showPayButton={true}
              />
            </div>
          ))}
        </div>

        {/* Simple Add New Card Button */}
        <button
          onClick={handleAddCard}
          className="w-full bg-black text-white p-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
        >
          Add New Card
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default CardsList; 