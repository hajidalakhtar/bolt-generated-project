'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  PaymentMethodType, 
  PaymentDetails 
} from '@/app/types/payment';
import { useToast } from '@/hooks/use-toast';

// Validation schemas
const creditCardSchema = z.object({
  cardNumber: z.string()
    .min(12, 'Card number must be at least 12 digits')
    .max(19, 'Card number cannot exceed 19 digits')
    .regex(/^\d+$/, 'Card number must contain only digits'),
  cardHolderName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  expiryMonth: z.string().length(2, 'Invalid month'),
  expiryYear: z.string().length(4, 'Invalid year'),
  cvv: z.string()
    .min(3, 'CVV must be 3-4 digits')
    .max(4, 'CVV must be 3-4 digits')
    .regex(/^\d+$/, 'CVV must contain only digits')
});

const bankTransferSchema = z.object({
  bankName: z.string().min(2, 'Bank name is required'),
  accountNumber: z.string()
    .min(8, 'Account number must be at least 8 digits')
    .max(20, 'Account number cannot exceed 20 digits')
    .regex(/^\d+$/, 'Account number must contain only digits'),
  accountHolderName: z.string()
    .min(2, 'Account holder name is required')
    .max(50, 'Name cannot exceed 50 characters')
});

const eWalletSchema = z.object({
  walletProvider: z.string().min(2, 'Wallet provider is required'),
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits')
});

interface PaymentFormProps {
  method: PaymentMethodType;
  amount: number;
  onSubmit: (details: PaymentDetails) => Promise<void>;
}

export default function PaymentForm({ 
  method, 
  amount, 
  onSubmit 
}: PaymentFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = 
    method === 'CREDIT_CARD' ? creditCardSchema :
    method === 'BANK_TRANSFER' ? bankTransferSchema :
    eWalletSchema;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: 
      method === 'CREDIT_CARD' ? {
        cardNumber: '',
        cardHolderName: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
      } : method === 'BANK_TRANSFER' ? {
        bankName: '',
        accountNumber: '',
        accountHolderName: ''
      } : {
        walletProvider: '',
        phoneNumber: ''
      }
  });

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        amount,
        method,
        ...(method === 'CREDIT_CARD' && { creditCard: values }),
        ...(method === 'BANK_TRANSFER' && { bankTransfer: values }),
        ...(method === 'E_WALLET' && { eWallet: values })
      });
      
      toast({
        title: 'Payment Successful',
        description: `Payment of $${amount} processed successfully`,
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPaymentFields = () => {
    switch (method) {
      case 'CREDIT_CARD':
        return (
          <>
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="1234 5678 9012 3456" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Holder Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="expiryMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Month</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="MM" 
                        maxLength={2} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiryYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Year</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="YYYY" 
                        maxLength={4} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123" 
                        maxLength={4} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );
      case 'BANK_TRANSFER':
        return (
          <>
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your Bank Name" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="123456789" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 'E_WALLET':
        return (
          <>
            <FormField
              control={form.control}
              name="walletProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Provider</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Wallet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="apple-pay">Apple Pay</SelectItem>
                      <SelectItem value="google-pay">Google Pay</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+1 (123) 456-7890" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleSubmit)} 
        className="space-y-6"
      >
        {renderPaymentFields()}
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">Total Amount</p>
            <p className="text-2xl text-primary">${amount.toFixed(2)}</p>
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Payment'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
