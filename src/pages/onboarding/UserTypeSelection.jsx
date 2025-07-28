import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, CreditCard, Calculator, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';
import Header from '../../components/common/Header';

const UserTypeSelection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { updateUser } = useUser();
  const [selectedType, setSelectedType] = useState(null);

  const userTypes = [
    {
      id: 'personal',
      title: t('personalUser'),
      description: t('manageCards'),
      icon: User,
      features: [
        'Multiple credit card management',
        'UPI payments & auto-pay',
        'Cashback & rewards',
        'Bill reminders'
      ],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'business',
      title: t('businessMSME'),
      description: t('businessPayments'),
      icon: Building2,
      features: [
        'Bulk bill payments',
        'GST invoice management',
        'Business expense tracking',
        'Team member access'
      ],
      color: 'bg-green-50 border-green-200'
    }
  ];

  const handleContinue = () => {
    if (selectedType) {
      updateUser({ userType: selectedType });
      navigate('/phone-verification');
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header title="" showBack={true} />
      
      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('chooseAccountType')}
          </h1>
          <p className="text-gray-600">
            Select the account type that best fits your needs
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {userTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                  isSelected 
                    ? 'border-primary bg-blue-50 shadow-lg' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon size={24} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {type.title}
                      </h3>
                      {isSelected && (
                        <CheckCircle size={20} className="text-primary" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {type.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Why choose Pice?
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <CreditCard className="text-primary" size={20} />
              </div>
              <p className="text-sm font-medium text-gray-900">Zero Fees</p>
              <p className="text-xs text-gray-600">No hidden charges</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Calculator className="text-green-600" size={20} />
              </div>
              <p className="text-sm font-medium text-gray-900">Smart Analytics</p>
              <p className="text-xs text-gray-600">Track spending</p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedType}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            selectedType
              ? 'bg-primary text-white hover:bg-accent active:scale-95'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {t('continue')}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelection; 