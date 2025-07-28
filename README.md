# Pice Credit Card Payments App 💳

A mobile-first prototype for Pice's credit card bill payment app targeting Tier-2 cities, specifically Indore, with focus on MSME and personal users.

## 🎯 Project Overview

**Brand Positioning**: "Business Se Ghar Tak, Secure and rewarding"

**Target Audience**: Personal users + MSMEs in Indore

**Key Features**: 
- UPI-based credit card payments
- Local Indore deals and rewards
- Multilingual support (English/Hindi)
- Personalized reminders and auto-pay

## 🚀 Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Language**: English/Hindi translation system

## 📱 Features Implemented

### ✅ Phase 1 - Core Structure
- [x] React + Vite project setup
- [x] Tailwind CSS responsive layout
- [x] Language toggle system (EN/HI)
- [x] Bottom navigation component
- [x] Landing page and onboarding flow

### ✅ Phase 2 - Dashboard & Cards
- [x] Main dashboard with stats and recent transactions
- [x] Credit cards list with bank-specific styling
- [x] Mock UPI payment flow UI
- [x] Transaction history display

### ✅ Phase 3 - Rewards System
- [x] Rewards dashboard with cashback stats
- [x] Local Indore deals section
- [x] Gift cards grid
- [x] Festive offers and promotions

### ✅ Phase 4 - Profile & Settings
- [x] User profile management
- [x] Language preferences
- [x] Account type management (Personal/Business)
- [x] App settings and logout

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   │   ├── Header.jsx
│   │   ├── BottomNavigation.jsx
│   │   └── LanguageToggle.jsx
│   ├── cards/           # Credit card components
│   │   └── CreditCardComponent.jsx
│   └── rewards/         # Rewards components
├── pages/
│   ├── onboarding/      # Authentication flow
│   │   ├── Landing.jsx
│   │   ├── UserTypeSelection.jsx
│   │   └── PhoneVerification.jsx
│   ├── dashboard/       # Main dashboard
│   │   └── Dashboard.jsx
│   ├── payments/        # Payment flow
│   │   └── CardsList.jsx
│   ├── rewards/         # Rewards system
│   │   └── RewardsPage.jsx
│   └── profile/         # User profile
│       └── ProfilePage.jsx
├── contexts/            # React Context providers
│   ├── LanguageContext.jsx
│   └── UserContext.jsx
├── data/                # Mock data and helpers
│   └── mockData.js
└── App.jsx             # Main app with routing
```

## 💾 Mock Data

The app includes comprehensive mock data:

- **3 Credit Cards**: HDFC, SBI, ICICI with realistic amounts
- **Transaction History**: Recent payments and cashback
- **Local Deals**: 4 Indore-specific business offers
- **Gift Cards**: 5 popular brand options
- **User Profile**: Sample user with Indore location

## 🎨 Design System

### Colors
- **Primary**: #007AFF (Pice brand blue)
- **Accent**: #0A84FF
- **Background**: #F8FAFC
- **Success**: Green variants
- **Warning**: Orange variants

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: Mobile-optimized hierarchy

### Components
- **Cards**: Rounded corners (12px), subtle shadows
- **Buttons**: 44px minimum touch targets
- **Mobile**: 375px base, responsive down to 320px

## 🌐 Multilingual Support

Complete English/Hindi translation system:
- Context-based language management
- Persistent language preferences
- 50+ translated strings
- Easy to extend with new languages

## 📱 Mobile-First Features

- **Safe Area**: iOS safe area inset support
- **Touch Targets**: Minimum 44px height
- **Gestures**: Tap, swipe, and scroll optimized
- **Performance**: Optimized for mobile browsers

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pice-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
npm run build
npm run preview
```

## 🎮 Demo Flow

1. **Landing Page**: View app introduction and features
2. **User Type**: Choose Personal or Business account
3. **Phone Verification**: Auto-fills OTP for demo (123456)
4. **Dashboard**: Explore stats, cards, and transactions
5. **Cards**: View credit cards and payment options
6. **Rewards**: Browse Indore deals and gift cards
7. **Profile**: Manage settings and language preferences

## 🏪 Indore Local Features

### Featured Local Businesses
- **Sarafa Bazaar**: 10% off food orders
- **Rajwada Shopping**: 5% cashback
- **Indore Central Mall**: Gift vouchers
- **Local Restaurants**: 15% discount coupons

### Cultural Elements
- Hindi language support
- Local business integration
- Tier-2 city specific features
- MSME-focused tools

## 🔧 Configuration

### Environment Variables
Create a `.env` file for any future API integrations:
```env
VITE_API_URL=your-api-url
VITE_ENVIRONMENT=development
```

### Tailwind Customization
Modify `tailwind.config.js` for design system changes:
- Brand colors
- Mobile breakpoints
- Custom utilities

## 📝 Known Demo Limitations

- **No Backend**: All data is mocked
- **No Real Payments**: UI-only payment flow
- **Limited Navigation**: Some buttons are placeholders
- **Auto-Login**: Demo auto-completes verification

## 🔮 Future Enhancements

### Phase 5 - Production Ready
- [ ] Real API integration
- [ ] Actual UPI payment gateway
- [ ] Push notifications
- [ ] Offline support
- [ ] Performance optimizations
- [ ] Analytics integration

### Business Features
- [ ] GST invoice management
- [ ] Bulk payment processing
- [ ] Team member access
- [ ] Expense tracking
- [ ] Business analytics

## 🤝 Contributing

This is a prototype project. For production deployment:

1. Integrate with real payment APIs
2. Add proper authentication
3. Implement data persistence
4. Add comprehensive testing
5. Security hardening

## 📄 License

This project is a prototype for demonstration purposes.

---

**Made with ❤️ for Indore** | **"Business Se Ghar Tak, Secure and rewarding"**
