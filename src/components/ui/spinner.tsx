import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva('animate-spin text-text', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-12',
      xl: 'size-16',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  children?: React.ReactNode;
  className?: string;
}

export function Spinner({
  size,
  show,
  children,
  className,
}: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
}
