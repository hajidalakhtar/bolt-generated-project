'use client';

import { Button } from '@/components/ui/button';
import { CircleDollarSign } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <CircleDollarSign className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">PayEase</span>
        </div>
        <Button variant="outline" size="sm">
          Login
        </Button>
      </div>
    </header>
  );
}
