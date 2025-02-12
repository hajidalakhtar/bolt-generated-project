'use client';

import * as Icons from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';
import { ServiceCategory } from '../types';

interface ServiceCardProps {
  service: ServiceCategory;
  onClick: () => void;
}

export default function ServiceCard({ service, onClick }: ServiceCardProps) {
  const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  if (!IconComponent) {
    console.warn(`Icon "${service.icon}" not found in Lucide icons`);
    return null;
  }

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="flex flex-col items-center text-center p-3">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <IconComponent className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-sm">{service.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
      </CardHeader>
    </Card>
  );
}
