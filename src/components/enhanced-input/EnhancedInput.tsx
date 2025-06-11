import * as React from "react";
import { cn } from "../../lib/utils";

export interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  InputComponent: React.ComponentType<any>;
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  loading?: boolean;
  onValueChange?: (value: string) => void;
}

export const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ 
    InputComponent, 
    label, 
    description, 
    error, 
    success, 
    loading, 
    className,
    onValueChange,
    onChange,
    ...props 
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={props.id} 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <InputComponent
            ref={ref}
            className={cn(
              // Base styling handled by shadcn Input
              error && "border-red-500 focus-visible:ring-red-500",
              success && "border-green-500 focus-visible:ring-green-500",
              loading && "opacity-50 cursor-not-allowed",
              className
            )}
            onChange={handleChange}
            disabled={loading || props.disabled}
            {...props}
          />
          
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-foreground" />
            </div>
          )}
        </div>
        
        {description && !error && !success && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        
        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
        
        {success && (
          <p className="text-xs text-green-600">{success}</p>
        )}
      </div>
    );
  }
);

EnhancedInput.displayName = "EnhancedInput"; 