import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { UserProvider, useUser } from './contexts/UserContext';

// Import pages
import Landing from './pages/onboarding/Landing';
import UserTypeSelection from './pages/onboarding/UserTypeSelection';
import PhoneVerification from './pages/onboarding/PhoneVerification';
import ProfileSetup from './pages/onboarding/ProfileSetup';
import Dashboard from './pages/dashboard/Dashboard';
import CardsList from './pages/payments/CardsList';
import PaymentFlow from './pages/payments/PaymentFlow';
import RewardsPage from './pages/rewards/RewardsPage';
import ProfilePage from './pages/profile/ProfilePage';
import RemindersPage from './pages/reminders/RemindersPage';

// Wrapper component to handle authentication routing
const AppRoutes = () => {
  const { isAuthenticated, isOnboardingComplete } = useUser();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/landing" element={<Landing />} />
      <Route path="/user-type-selection" element={<UserTypeSelection />} />
      <Route path="/phone-verification" element={<PhoneVerification />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated && isOnboardingComplete ? 
            <Dashboard /> : 
            <Navigate to="/landing" replace />
        } 
      />
      <Route 
        path="/cards" 
        element={
          isAuthenticated && isOnboardingComplete ? 
            <CardsList /> : 
            <Navigate to="/landing" replace />
        } 
      />
      <Route 
        path="/payment" 
        element={
          isAuthenticated && isOnboardingComplete ? 
            <PaymentFlow /> : 
            <Navigate to="/landing" replace />
        } 
      />
      <Route 
        path="/rewards" 
        element={
          isAuthenticated && isOnboardingComplete ? 
            <RewardsPage /> : 
            <Navigate to="/landing" replace />
        } 
      />
      <Route 
        path="/reminders" 
        element={
          isAuthenticated && isOnboardingComplete ? 
            <RemindersPage /> : 
            <Navigate to="/landing" replace />
        } 
      />
      <Route 
        path="/profile" 
        element={
          isAuthenticated && isOnboardingComplete ? 
            <ProfilePage /> : 
            <Navigate to="/landing" replace />
        } 
      />
      
      {/* Default redirects */}
      <Route 
        path="/" 
        element={
          isAuthenticated && isOnboardingComplete ? 
            <Navigate to="/dashboard" replace /> : 
            <Navigate to="/landing" replace />
        } 
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
