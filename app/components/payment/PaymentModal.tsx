'use client';

import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentForm from './PaymentForm';
import { 
  PaymentMethodType, 
  PaymentDetails, 
  PaymentResponse 
} from '@/app/types/payment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentComplete: (response: PaymentResponse) => void;
}

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  amount,
  onPaymentComplete 
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | undefined>();

  const handlePaymentSubmit = async (details: PaymentDetails) => {
    // Simulated payment processing
    try {
      // In a real-world scenario, this would be an API call to your payment gateway
      const response: PaymentResponse = await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure
          const success = Math.random() > 0.2;
          success 
            ? resolve({ 
                success: true, 
                transactionId: `TXN_${Math.random().toString(36).substr(2, 9)}` 
              })
            : reject(new Error('Payment processing failed'));
        }, 2000);
      });

      onPaymentComplete(response);
      onClose();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
        </DialogHeader>

        {!selectedMethod ? (
          <PaymentMethodSelector 
            onMethodSelect={setSelectedMethod} 
          />
        ) : (
          <PaymentForm
            method={selectedMethod}
            amount={amount}
            onSubmit={handlePaymentSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
