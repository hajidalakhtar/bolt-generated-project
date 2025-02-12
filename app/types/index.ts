export type ServiceCategory = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
};

export type Transaction = {
  id: string;
  type: 'MOBILE_CREDIT' | 'DATA_PACKAGE' | 'ELECTRICITY' | 'WATER' | 'INTERNET' | 'E_WALLET';
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  timestamp: string;
  customerNumber: string;
  productName: string;
};

export type PaymentMethod = {
  id: string;
  name: string;
  type: 'BANK_TRANSFER' | 'E_WALLET' | 'CREDIT_CARD';
  icon: string;
};
