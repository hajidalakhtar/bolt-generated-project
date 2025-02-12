import { ServiceCategory, Product, PaymentMethod } from '../types';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'mobile-credit',
    name: 'Mobile Credit',
    icon: 'Smartphone',
    description: 'Top up your mobile credit instantly',
  },
  {
    id: 'data-package',
    name: 'Data Package',
    icon: 'Wifi',
    description: 'Browse the internet with high-speed data',
  },
  {
    id: 'electricity',
    name: 'Electricity',
    icon: 'Zap',
    description: 'Pay your electricity bills',
  },
  {
    id: 'water',
    name: 'Water',
    icon: 'Droplet',
    description: 'Pay your water bills',
  },
  {
    id: 'internet',
    name: 'Internet',
    icon: 'Globe',
    description: 'Pay your internet bills',
  },
  {
    id: 'e-wallet',
    name: 'E-Wallet',
    icon: 'Wallet',
    description: 'Top up your e-wallet balance',
  },
];

export const products: Product[] = [
  {
    id: 'mc-5',
    name: '5 USD Credit',
    price: 5,
    description: 'Mobile credit worth 5 USD',
    category: 'mobile-credit',
  },
  {
    id: 'mc-10',
    name: '10 USD Credit',
    price: 10,
    description: 'Mobile credit worth 10 USD',
    category: 'mobile-credit',
  },
  {
    id: 'dp-1gb',
    name: '1GB Data',
    price: 5,
    description: '1GB high-speed data valid for 30 days',
    category: 'data-package',
  },
  {
    id: 'dp-5gb',
    name: '5GB Data',
    price: 20,
    description: '5GB high-speed data valid for 30 days',
    category: 'data-package',
  },
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    type: 'BANK_TRANSFER',
    icon: 'Building',
  },
  {
    id: 'e-wallet',
    name: 'E-Wallet',
    type: 'E_WALLET',
    icon: 'Wallet',
  },
  {
    id: 'credit-card',
    name: 'Credit Card',
    type: 'CREDIT_CARD',
    icon: 'CreditCard',
  },
];
