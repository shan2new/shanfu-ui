import * as React from "react";
import { cn } from "../../lib/utils";
import { EnhancedTextarea } from "../enhanced-textarea/EnhancedTextarea";

export interface InlineEditTextareaProps {
  value: string;
  onSave: (value: string) => Promise<void> | void;
  placeholder?: string;
  TextareaComponent: React.ComponentType<any>;
  className?: string;
  disabled?: boolean;
  displayClassName?: string;
  editClassName?: string;
  rows?: number;
}

export function InlineEditTextarea({
  value,
  onSave,
  placeholder = "Click to edit",
  TextareaComponent,
  className,
  disabled = false,
  displayClassName,
  editClassName,
  rows = 3,
}: InlineEditTextareaProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(value);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    setEditValue(value);
  }, [value]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isEditing) {
        handleCancel();
      }
    };

    if (isEditing) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (disabled) return;
    setIsEditing(true);
    setEditValue(value);
  };

  const handleSave = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  // Format display text to show line breaks
  const formatDisplayText = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Calculate height to match textarea exactly
  // Use a more precise calculation that matches textarea behavior
  const getTextareaHeight = () => {
    if (rows === 1) return 40; // h-10 for single line
    // For multi-line: text-sm line-height (20px) * rows + padding (16px) + border (2px)
    return (20 * rows) + 18;
  };

  const textareaHeight = getTextareaHeight();

  if (isEditing) {
    return (
      <EnhancedTextarea
        TextareaComponent={TextareaComponent}
        value={editValue}
        onValueChange={setEditValue}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        placeholder={placeholder}
        disabled={isSubmitting}
        rows={rows}
        className={cn(
          "w-full px-3 py-2 rounded-md border border-transparent resize-none",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "focus:border-border",
          "transition-all duration-200",
          "text-sm",
          className,
          editClassName
        )}
        style={{ 
          height: `${textareaHeight}px`, 
          minHeight: `${textareaHeight}px`,
          fontSize: '0.875rem'
        }}
        autoFocus
      />
    );
  }

  return (
    <div
      className={cn(
        "w-full flex px-3 py-2 rounded-md text-sm",
        "hover:bg-muted/50 transition-all duration-200 cursor-pointer",
        "border border-transparent hover:border-border",
        rows === 1 ? "items-center" : "items-start",
        disabled && "cursor-not-allowed opacity-50 hover:bg-transparent hover:border-transparent",
        className
      )}
      style={{ height: `${textareaHeight}px`, minHeight: `${textareaHeight}px` }}
      onClick={handleEdit}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
          e.preventDefault();
          handleEdit();
        }
      }}
      aria-label={`Edit ${value || placeholder}`}
    >
      <div className={cn(
        "w-full whitespace-pre-wrap text-sm leading-5",
        !value && "text-muted-foreground italic",
        displayClassName
      )}>
        {value ? formatDisplayText(value) : placeholder}
      </div>
    </div>
  );
} 