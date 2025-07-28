import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, Smartphone, QrCode, CheckCircle, CreditCard, AlertCircle, Gift } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Header from '../../components/common/Header';
import { formatCurrency, formatDate } from '../../data/mockData';
import indoreStreetImage from '../../assets/indore-street.jpg';

const PaymentFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { card, paymentType, amount: initialAmount } = location.state || {};

  const [step, setStep] = useState('bill-details'); // 'bill-details', 'payment', 'confirmation'
  const [selectedAmount, setSelectedAmount] = useState(paymentType);
  const [customAmount, setCustomAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi-id');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!card) {
    navigate('/cards');
    return null;
  }

  const getPaymentAmount = () => {
    if (selectedAmount === 'minimum') return card.minimumDue;
    if (selectedAmount === 'full') return card.outstandingAmount;
    return parseInt(customAmount) || 0;
  };

  const handleAmountSelection = (type) => {
    setSelectedAmount(type);
    if (type !== 'custom') {
      setCustomAmount('');
    }
  };

  const handleProceedToPayment = () => {
    const amount = getPaymentAmount();
    if (amount > 0) {
      setStep('payment');
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
    }, 3000);
  };

  const handleComplete = () => {
    navigate('/dashboard');
  };

  if (step === 'bill-details') {
    return (
      <div className="min-h-screen bg-secondary">
        <Header title="Bill Details" showBack={true} />
        
        <div className="px-4 py-6">
          {/* Card Details */}
          <div className="bg-white rounded-xl p-4 mb-6 shadow-card">
            <div 
              className="p-4 rounded-xl text-white mb-4"
              style={{ backgroundColor: card.color }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{card.bankName}</h3>
                  <p className="text-white/80">{card.cardType}</p>
                </div>
                <p className="text-white font-mono">•••• {card.lastFourDigits}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Outstanding</span>
                <span className="font-semibold">{formatCurrency(card.outstandingAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum Due</span>
                <span className="font-semibold">{formatCurrency(card.minimumDue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Due Date</span>
                <span className="font-semibold">{formatDate(card.dueDate)}</span>
              </div>
            </div>
          </div>

          {/* Amount Selection */}
          <div className="bg-white rounded-xl p-4 mb-6 shadow-card">
            <h3 className="font-semibold text-gray-900 mb-4">Select Payment Amount</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => handleAmountSelection('full')}
                className={`w-full p-4 rounded-xl border-2 transition-colors ${
                  selectedAmount === 'full'
                    ? 'border-primary bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Full Amount</p>
                    <p className="text-gray-600 text-sm">Clear entire outstanding</p>
                  </div>
                  <p className="font-bold text-lg">{formatCurrency(card.outstandingAmount)}</p>
                </div>
              </button>

              <button
                onClick={() => handleAmountSelection('minimum')}
                className={`w-full p-4 rounded-xl border-2 transition-colors ${
                  selectedAmount === 'minimum'
                    ? 'border-primary bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Minimum Amount</p>
                    <p className="text-gray-600 text-sm">Pay minimum to avoid late fees</p>
                  </div>
                  <p className="font-bold text-lg">{formatCurrency(card.minimumDue)}</p>
                </div>
              </button>

              <div className={`p-4 rounded-xl border-2 transition-colors ${
                selectedAmount === 'custom'
                  ? 'border-primary bg-blue-50'
                  : 'border-gray-200'
              }`}>
                <button
                  onClick={() => handleAmountSelection('custom')}
                  className="w-full text-left mb-3"
                >
                  <p className="font-medium text-gray-900">Custom Amount</p>
                  <p className="text-gray-600 text-sm">Enter your preferred amount</p>
                </button>
                
                {selectedAmount === 'custom' && (
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Cashback Info with Gradient Border */}
          <div className="relative p-1 rounded-xl bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Gift size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold text-sm">Earn Cashback!</p>
                    <p className="text-gray-600 text-xs">Get ₹{Math.round(getPaymentAmount() * 0.005)} cashback on this payment</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-700 font-bold text-lg">🎁</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleProceedToPayment}
            disabled={getPaymentAmount() === 0}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
              getPaymentAmount() > 0
                ? 'bg-primary text-white hover:bg-accent active:scale-95'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Pay {formatCurrency(getPaymentAmount())} with UPI
          </button>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-secondary">
        <Header title="UPI Payment" showBack={true} />
        
        <div className="px-4 py-6">
          {/* Payment Summary */}
          <div className="bg-white rounded-xl p-4 mb-6 shadow-card">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold">{formatCurrency(getPaymentAmount())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Card</span>
                <span className="font-semibold">{card.bankName} •••• {card.lastFourDigits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cashback</span>
                <span className="text-green-600 font-semibold">₹{Math.round(getPaymentAmount() * 0.005)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection with UPI ID Input */}
          <div className="bg-white rounded-xl p-4 mb-6 shadow-card">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
            
            <div className="space-y-3">
              <div className="p-4 rounded-xl border-2 border-primary bg-blue-50">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="text-primary" size={20} />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">UPI ID</p>
                    <p className="text-gray-600 text-sm">Pay using UPI ID</p>
                  </div>
                </div>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="example@upi"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Trust Icons */}
          <div className="bg-white rounded-xl p-4 mb-6 shadow-card">
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="text-green-600" size={16} />
                <span className="text-sm font-medium text-gray-700">Secure</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Smartphone className="text-blue-600" size={16} />
                <span className="text-sm font-medium text-gray-700">Instant</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600" size={16} />
                <span className="text-sm font-medium text-gray-700">Zero Charges</span>
              </div>
            </div>
          </div>



          <button
            onClick={handlePayment}
            disabled={!upiId}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
              upiId
                ? 'bg-primary text-white hover:bg-accent active:scale-95'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isProcessing ? 'Processing...' : `Pay ${formatCurrency(getPaymentAmount())}`}
          </button>
        </div>
      </div>
    );
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Exact Indore Image Background - No editing */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${indoreStreetImage})`,
          }}
        />
        
        {/* Header Only */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <Header title="" showBack={false} />
        </div>
        
        {/* Bottom Payment Success Card */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="mx-4 mb-4">
            {/* Success Notification Card */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
              {/* Header with Success Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="text-white" size={24} style={{ animation: 'checkmark 0.6s ease-in-out 0.3s both' }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">Credit Card Bill Paid Successfully</h3>
                  <p className="text-sm text-gray-600">{new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short' })} {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View details</button>
              </div>
              
              {/* Payment Details */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <CreditCard className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{card.bankName} Credit Card</p>
                    <p className="text-sm text-gray-600">Card ending with {card.lastFourDigits}</p>
                    <p className="text-lg font-bold text-gray-900">Paid {formatCurrency(getPaymentAmount())}</p>
                  </div>
                </div>
              </div>
              
              {/* Important Note */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-orange-600">Important:</span> {card.bankName} will consider {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long' })} as the payment date. It may take up to 2 working days to reflect in your account.
                  </p>
                </div>
              </div>
              
              {/* Cashback Section */}
              <div className="relative p-1 rounded-xl bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Gift size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold text-sm">Cashback Earned!</p>
                        <p className="text-gray-600 text-xs">₹{Math.round(getPaymentAmount() * 0.005)} has been added to your rewards</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-700 font-bold text-lg">🎁</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom Button */}
              <button
                onClick={handleComplete}
                className="w-full py-4 px-6 bg-primary text-white rounded-xl font-semibold hover:bg-accent active:scale-95 transition-all duration-200 shadow-lg"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
        
        {/* INDORE Banner Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <div className="text-sm font-medium tracking-wider mb-2 opacity-90">INDOWAR BANNER</div>
            <div className="text-6xl font-bold tracking-wider drop-shadow-2xl">INDORE</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentFlow; 