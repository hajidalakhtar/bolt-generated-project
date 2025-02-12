'use client';

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-3">
        <h3 className="font-semibold text-sm">{product.name}</h3>
      </CardHeader>
      <CardContent className="flex-grow p-3 pt-0">
        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-3">
        <p className="font-semibold text-sm">${product.price}</p>
        <Button size="sm" onClick={() => onSelect(product)}>Select</Button>
      </CardFooter>
    </Card>
  );
}
