import * as React from "react";
import { cn } from "../../lib/utils";

export interface EnhancedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  TextareaComponent: React.ComponentType<any>;
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  loading?: boolean;
  onValueChange?: (value: string) => void;
  maxLength?: number;
  showCharCount?: boolean;
  autoResize?: boolean;
}

export const EnhancedTextarea = React.forwardRef<HTMLTextAreaElement, EnhancedTextareaProps>(
  ({ 
    TextareaComponent, 
    label, 
    description, 
    error, 
    success, 
    loading,
    maxLength,
    showCharCount = false,
    autoResize = false,
    className,
    onValueChange,
    onChange,
    value,
    ...props 
  }, ref) => {
    const [currentLength, setCurrentLength] = React.useState(
      typeof value === 'string' ? value.length : 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setCurrentLength(newValue.length);
      onChange?.(e);
      onValueChange?.(newValue);
      
      // Auto-resize functionality
      if (autoResize && e.target) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
    };

    React.useEffect(() => {
      if (typeof value === 'string') {
        setCurrentLength(value.length);
      }
    }, [value]);

    const isOverLimit = maxLength ? currentLength > maxLength : false;

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
          <TextareaComponent
            ref={ref}
            className={cn(
              // Base styling handled by shadcn Textarea
              error && "border-red-500 focus-visible:ring-red-500",
              success && "border-green-500 focus-visible:ring-green-500",
              loading && "opacity-50 cursor-not-allowed",
              isOverLimit && "border-red-500 focus-visible:ring-red-500",
              autoResize && "resize-none overflow-hidden",
              className
            )}
            onChange={handleChange}
            disabled={loading || props.disabled}
            maxLength={maxLength}
            value={value}
            {...props}
          />
          
          {loading && (
            <div className="absolute right-3 top-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-foreground" />
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-start">
          <div className="flex-1">
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
          
          {(showCharCount || maxLength) && (
            <p className={cn(
              "text-xs tabular-nums",
              isOverLimit ? "text-red-600" : "text-muted-foreground"
            )}>
              {currentLength}{maxLength && `/${maxLength}`}
            </p>
          )}
        </div>
      </div>
    );
  }
);

EnhancedTextarea.displayName = "EnhancedTextarea"; 