'use client';

import Image from 'next/image';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { 
  CreditCard, 
  ShieldCheck, 
  Smartphone, 
  Globe 
} from 'lucide-react';

const bannerSlides = [
  {
    icon: CreditCard,
    title: 'Seamless Payments',
    description: 'Instant transactions across multiple payment methods',
    background: '/images/payment-bg-1.jpg',
    color: 'from-blue-500 to-blue-700'
  },
  {
    icon: ShieldCheck,
    title: 'Bank-Grade Security',
    description: 'Advanced encryption and fraud protection',
    background: '/images/security-bg.jpg',
    color: 'from-green-500 to-green-700'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Experience',
    description: 'Pay anytime, anywhere with our mobile-optimized platform',
    background: '/images/mobile-bg.jpg',
    color: 'from-purple-500 to-purple-700'
  },
  {
    icon: Globe,
    title: 'Global Connectivity',
    description: 'International payments made simple and fast',
    background: '/images/global-bg.jpg',
    color: 'from-indigo-500 to-indigo-700'
  }
];

export default function ServiceBanner() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {bannerSlides.map((slide, index) => (
            <CarouselItem key={index} className="md:basis-full">
              <div 
                className={`
                  relative overflow-hidden rounded-xl 
                  bg-gradient-to-r ${slide.color} 
                  text-white shadow-2xl
                  flex flex-col md:flex-row items-center
                  min-h-[300px] md:min-h-[400px]
                `}
              >
                {/* Background Image */}
                <Image 
                  src={slide.background} 
                  alt={slide.title}
                  fill
                  priority
                  className="absolute inset-0 object-cover opacity-20"
                />

                {/* Content */}
                <div 
                  className="
                    relative z-10 
                    flex items-center 
                    p-8 md:p-12 
                    space-x-6 
                    w-full
                  "
                >
                  {/* Icon */}
                  <div className="hidden md:block">
                    <slide.icon 
                      className="
                        w-24 h-24 
                        text-white/80 
                        drop-shadow-lg
                      " 
                    />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-4 max-w-xl">
                    <h2 
                      className="
                        text-3xl md:text-4xl 
                        font-bold 
                        tracking-tight
                      "
                    >
                      {slide.title}
                    </h2>
                    <p 
                      className="
                        text-base md:text-lg 
                        text-white/90
                        font-medium
                      "
                    >
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation */}
        <div className="hidden md:block">
          <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="right-4 top-1/2 -translate-y-1/2" />
        </div>
      </Carousel>
    </div>
  );
}
