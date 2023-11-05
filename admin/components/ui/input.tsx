import * as React from 'react';

import { cn } from '@/utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          'flex h-10 w-[92%] rounded-md border border-slate-300 bg-transparent py-1 bg-slate-200 px-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
