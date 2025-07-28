import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';
import Header from '../../components/common/Header';
import { mockUserProfile } from '../../data/mockData';

const PhoneVerification = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { login, completeOnboarding } = useUser();
  const [phone, setPhone] = useState('+91 98765 43210');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendOTP = () => {
    setIsVerifying(true);
    // Simulate OTP sending
    setTimeout(() => {
      setStep('otp');
      setIsVerifying(false);
    }, 1500);
  };

  const handleVerifyOTP = () => {
    setIsVerifying(true);
    // Simulate OTP verification and auto-login
    setTimeout(() => {
      login({
        ...mockUserProfile,
        phone: phone
      });
      navigate('/profile-setup');
    }, 1500);
  };

  useEffect(() => {
    // Auto-fill OTP for demo purposes
    if (step === 'otp') {
      setTimeout(() => {
        setOtp('123456');
      }, 1000);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-secondary">
      <Header title="Phone Verification" showBack={true} />
      
      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 'phone' ? 'Enter your phone number' : 'Verify OTP'}
          </h1>
          <p className="text-gray-600">
            {step === 'phone' 
              ? 'We\'ll send you a verification code' 
              : `Code sent to ${phone}`
            }
          </p>
        </div>

        {step === 'phone' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
                placeholder="+91 98765 43210"
              />
            </div>

            <button
              onClick={handleSendOTP}
              disabled={isVerifying || !phone}
              className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                isVerifying || !phone
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-accent active:scale-95'
              }`}
            >
              {isVerifying ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter 6-digit OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="input-field text-center text-2xl tracking-widest"
                placeholder="123456"
                maxLength={6}
              />
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={isVerifying || otp.length !== 6}
              className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                isVerifying || otp.length !== 6
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-accent active:scale-95'
              }`}
            >
              {isVerifying ? 'Verifying...' : 'Verify & Continue'}
            </button>

            <button
              onClick={() => setStep('phone')}
              className="w-full text-primary font-medium hover:text-accent"
            >
              Change phone number
            </button>
          </div>
        )}

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <CheckCircle size={16} className="text-green-500" />
            <span>Your data is secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification; 