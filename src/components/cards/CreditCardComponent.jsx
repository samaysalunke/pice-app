import React from 'react';
import { Calendar, DollarSign, Sparkles, Gift } from 'lucide-react';
import { formatCurrency, formatDate, getDaysUntilDue } from '../../data/mockData';

const CreditCardComponent = ({ card, onClick, showPayButton = true }) => {
  const daysUntilDue = getDaysUntilDue(card.dueDate);
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue <= 7 && daysUntilDue >= 0;

  const getUrgencyColor = () => {
    if (isOverdue) return 'text-red-600 bg-red-50';
    if (isDueSoon) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  const getUrgencyText = () => {
    if (isOverdue) return `${Math.abs(daysUntilDue)} days overdue`;
    if (daysUntilDue === 0) return 'Due today';
    if (daysUntilDue === 1) return 'Due tomorrow';
    return `${daysUntilDue} days left`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-border/50 overflow-hidden hover:shadow-xl hover:shadow-black/10 transition-all duration-300 ease-out">
      {/* Card Header with Bank Branding */}
      <div 
        className="p-6 text-white relative overflow-hidden"
        style={{ backgroundColor: card.color }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">{card.bankName}</h3>
              <p className="text-white/80 text-sm">{card.cardType}</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-xs">•••• •••• ••••</p>
              <p className="text-white font-mono text-lg">{card.lastFourDigits}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-xs mb-1">Outstanding Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(card.outstandingAmount)}</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-xs mb-1">Minimum Due</p>
              <p className="text-lg font-semibold">{formatCurrency(card.minimumDue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={16} />
            <span className="text-sm font-medium">Due: {formatDate(card.dueDate)}</span>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getUrgencyColor()}`}>
            {getUrgencyText()}
          </div>
        </div>

        {/* Action Buttons */}
        {showPayButton && (
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => onClick && onClick(card, 'minimum')}
              className="flex-1 bg-muted text-foreground py-3.5 px-4 rounded-xl font-semibold hover:bg-muted/80 transition-all duration-200 ease-out"
            >
              Pay Minimum
            </button>
            <button
              onClick={() => onClick && onClick(card, 'full')}
              className="flex-1 bg-primary text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 ease-out shadow-lg shadow-primary/25"
            >
              Pay Full
            </button>
          </div>
        )}

        {/* Enhanced Exclusive Offers Section with Gradient Border */}
        <div className="relative p-1 rounded-xl bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Gift size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-800 font-semibold text-sm">Eligible for exclusive offers</p>
                  <p className="text-gray-600 text-xs">Pay and earn</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-700 font-bold text-lg">🎁</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardComponent; 