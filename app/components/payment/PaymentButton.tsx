'use client';

import { useState } from 'react';
import { serviceCategories, products } from './data/mock';
import ServiceCard from './components/ServiceCard';
import ProductCard from './components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Product } from './types';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customerNumber, setCustomerNumber] = useState('');
  const { toast } = useToast();

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  const handleProductSelect = (product: Product) => {
    if (!customerNumber) {
      toast({
        title: 'Error',
        description: 'Please enter your customer number first',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: `Selected ${product.name} for customer ${customerNumber}`,
    });
  };

  return (
    <main className="px-4 py-6">
      <div className="mx-auto max-w-[576px]">
        <h1 className="text-2xl font-bold text-center mb-6">Digital Payment Services</h1>

        {!selectedCategory ? (
          <>
            <h2 className="text-lg font-semibold mb-4">Our Services</h2>
            <div className="grid grid-cols-2 gap-3">
              {serviceCategories.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onClick={() => setSelectedCategory(service.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => setSelectedCategory(null)}
            >
              ← Back to Services
            </Button>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Enter Customer Number</h2>
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Enter phone number or customer ID"
                  value={customerNumber}
                  onChange={(e) => setCustomerNumber(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4">Select Package</h2>
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={handleProductSelect}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
