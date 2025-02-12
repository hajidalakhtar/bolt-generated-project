export type PaymentMethodType = 'CREDIT_CARD' | 'BANK_TRANSFER' | 'E_WALLET';

export interface PaymentMethod {
  id: string;
  name: string;
  type: PaymentMethodType;
  icon: string;
}

export interface CreditCardDetails {
  cardNumber: string;
  cardHolderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export interface BankTransferDetails {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
}

export interface EWalletDetails {
  walletProvider: string;
  phoneNumber: string;
}

export interface PaymentDetails {
  amount: number;
  method: PaymentMethodType;
  creditCard?: CreditCardDetails;
  bankTransfer?: BankTransferDetails;
  eWallet?: EWalletDetails;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  errorMessage?: string;
}
