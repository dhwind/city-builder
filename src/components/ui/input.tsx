import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        default:
          'rounded border bg-white w-[5rem] border-input focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        editable:
          'p-0 pb-[3px] h-auto w-auto border-b-2 cursor-pointer transition-all rounded-none bg-transparent shadow-none focus-visible:cursor-text focus-visible:border-pinkish-orange',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Input: React.FC<
  React.ComponentProps<'input'> & VariantProps<typeof inputVariants>
> = ({ className, variant, type, ...props }) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  );
};

export { Input };
