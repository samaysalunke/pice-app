import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Briefcase, CreditCard, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';
import Header from '../../components/common/Header';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, updateUser, completeOnboarding } = useUser();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    city: 'Indore',
    occupation: '',
    monthlyIncome: '',
    hasCards: null
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const cities = [
    'Indore', 'Bhopal', 'Gwalior', 'Jabalpur', 'Ujjain', 'Dewas', 'Sagar', 'Ratlam'
  ];

  const occupations = [
    'Business Owner', 'Private Employee', 'Government Employee', 'Professional', 
    'Student', 'Freelancer', 'Retired', 'Other'
  ];

  const incomeRanges = [
    'Below ₹25,000', '₹25,000 - ₹50,000', '₹50,000 - ₹1,00,000', 
    '₹1,00,000 - ₹2,50,000', '₹2,50,000 - ₹5,00,000', 'Above ₹5,00,000'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    // Update user profile
    updateUser({
      name: formData.name,
      city: formData.city,
      occupation: formData.occupation,
      monthlyIncome: formData.monthlyIncome,
      hasCards: formData.hasCards,
      profileCompleted: true
    });
    
    // Complete onboarding
    completeOnboarding();
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() && formData.city;
      case 2:
        return formData.occupation && formData.monthlyIncome;
      case 3:
        return formData.hasCards !== null;
      default:
        return false;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="text-white" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h1>
        <p className="text-gray-600">Let's set up your profile to personalize your experience</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <select
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="input-field"
          >
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <MapPin className="text-blue-600" size={20} />
          <div>
            <p className="font-semibold text-blue-900">Location Benefits</p>
            <p className="text-blue-700 text-sm">
              We'll show you deals and offers specific to your city
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="text-white" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Professional Details</h1>
        <p className="text-gray-600">Help us understand your financial profile</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occupation *
          </label>
          <select
            value={formData.occupation}
            onChange={(e) => handleInputChange('occupation', e.target.value)}
            className="input-field"
          >
            <option value="">Select your occupation</option>
            {occupations.map(occupation => (
              <option key={occupation} value={occupation}>{occupation}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Income *
          </label>
          <select
            value={formData.monthlyIncome}
            onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
            className="input-field"
          >
            <option value="">Select income range</option>
            {incomeRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-600" size={20} />
          <div>
            <p className="font-semibold text-green-900">Privacy Protected</p>
            <p className="text-green-700 text-sm">
              Your information is encrypted and never shared with third parties
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="text-white" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Credit Cards</h1>
        <p className="text-gray-600">Do you currently have any credit cards?</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => handleInputChange('hasCards', true)}
          className={`w-full p-6 rounded-xl border-2 text-left transition-colors ${
            formData.hasCards === true
              ? 'border-primary bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              formData.hasCards === true ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              <CheckCircle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Yes, I have credit cards</h3>
              <p className="text-gray-600 text-sm">I want to manage my existing cards</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleInputChange('hasCards', false)}
          className={`w-full p-6 rounded-xl border-2 text-left transition-colors ${
            formData.hasCards === false
              ? 'border-primary bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              formData.hasCards === false ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              <CreditCard size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">No, I don't have any</h3>
              <p className="text-gray-600 text-sm">I'm exploring credit card options</p>
            </div>
          </div>
        </button>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <h3 className="font-semibold text-purple-900 mb-2">What's Next?</h3>
        <div className="space-y-1 text-sm text-purple-800">
          {formData.hasCards === true ? (
            <>
              <p>• Add your existing credit cards</p>
              <p>• Set up payment reminders</p>
              <p>• Start earning rewards on payments</p>
            </>
          ) : formData.hasCards === false ? (
            <>
              <p>• Explore credit card recommendations</p>
              <p>• Learn about credit building</p>
              <p>• Discover rewards and benefits</p>
            </>
          ) : (
            <p>• Complete setup to get personalized recommendations</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary">
      <Header title="Profile Setup" showBack={currentStep > 1} />
      
      <div className="px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 btn-secondary"
            >
              {t('back')}
            </button>
          )}
          
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`${currentStep === 1 ? 'w-full' : 'flex-1'} ${
              canProceed()
                ? 'btn-primary'
                : 'bg-gray-200 text-gray-500 py-3 px-6 rounded-xl font-medium cursor-not-allowed'
            }`}
          >
            {currentStep === totalSteps ? 'Complete Setup' : t('continue')}
          </button>
        </div>

        {/* Skip Option */}
        {currentStep === 2 && (
          <button
            onClick={() => setCurrentStep(3)}
            className="w-full text-center text-gray-500 hover:text-gray-700 mt-4"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup; 