import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 border',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg border-primary/20',
        destructive:
          'bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 hover:shadow-lg border-destructive/20',
        outline:
          'border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-accent',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md border-secondary/20',
        ghost:
          'border-transparent hover:bg-accent hover:text-accent-foreground hover:shadow-sm hover:border-accent/20',
        link: 'text-primary underline-offset-4 hover:underline border-transparent',
      },
      size: {
        default: 'h-12 px-5 py-2.5',
        sm: 'h-10 rounded-md px-4 text-sm',
        lg: 'h-14 rounded-md px-8',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
