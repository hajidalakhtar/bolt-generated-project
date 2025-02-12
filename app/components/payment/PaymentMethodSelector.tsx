'use client';

import { useState } from 'react';
import { 
  CreditCard, 
  Building, 
  Wallet 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { PaymentMethodType } from '@/app/types/payment';

const PAYMENT_METHODS = [
  {
    type: 'CREDIT_CARD',
    name: 'Credit Card',
    icon: CreditCard,
    description: 'Pay securely with your credit card'
  },
  {
    type: 'BANK_TRANSFER',
    name: 'Bank Transfer',
    icon: Building,
    description: 'Direct transfer from your bank account'
  },
  {
    type: 'E_WALLET',
    name: 'Digital Wallet',
    icon: Wallet,
    description: 'Quick payment using digital wallet'
  }
];

interface PaymentMethodSelectorProps {
  onMethodSelect: (method: PaymentMethodType) => void;
  selectedMethod?: PaymentMethodType;
}

export default function PaymentMethodSelector({ 
  onMethodSelect, 
  selectedMethod 
}: PaymentMethodSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {PAYMENT_METHODS.map((method) => (
        <Card 
          key={method.type}
          className={`
            cursor-pointer 
            transition-all 
            hover:border-primary 
            ${selectedMethod === method.type 
              ? 'border-2 border-primary' 
              : 'border'}
          `}
          onClick={() => onMethodSelect(method.type as PaymentMethodType)}
        >
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <method.icon className="w-6 h-6 text-primary" />
            <CardTitle className="text-base">{method.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {method.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
