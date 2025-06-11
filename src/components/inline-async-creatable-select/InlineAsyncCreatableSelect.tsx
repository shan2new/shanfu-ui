import { useState, useCallback, useRef, useEffect } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { AsyncCreatableSelect, AsyncCreatableSelectProps } from "../async-select/AsyncCreatableSelect";
import { cn } from "../../lib/utils";

export interface InlineAsyncCreatableSelectProps<T> extends Omit<AsyncCreatableSelectProps<T>, 'value' | 'onChange'> {
  /** Current value */
  value: string;
  /** Save handler - called when user confirms the edit */
  onSave: (value: string) => Promise<void>;
  /** Cancel handler - called when user cancels the edit */
  onCancel?: () => void;
  /** Whether the field is currently being edited */
  isEditing?: boolean;
  /** Auto-save on selection (no need for explicit save/cancel) */
  autoSave?: boolean;
  /** Custom display text when not editing */
  displayText?: string;
  /** CSS class for display mode */
  displayClassName?: string;
  /** CSS class for edit mode */
  editClassName?: string;
  /** Show save/cancel buttons */
  showControls?: boolean;
  /** Trigger edit mode on click */
  triggerOnClick?: boolean;
  /** Allow empty value */
  allowEmpty?: boolean;
  /** Empty state display text */
  emptyText?: string;
}

export function InlineAsyncCreatableSelect<T>({
  value,
  onSave,
  onCancel,
  isEditing: controlledIsEditing,
  autoSave = false,
  displayText,
  displayClassName,
  editClassName,
  showControls = true,
  triggerOnClick = true,
  allowEmpty = true,
  emptyText = "Click to select or create...",
  getDisplayValue,
  getOptionValue,
  onCreateOption,
  ...asyncCreatableSelectProps
}: InlineAsyncCreatableSelectProps<T>) {
  const [internalIsEditing, setInternalIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isEditing = controlledIsEditing ?? internalIsEditing;

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (isEditing && !controlledIsEditing) {
          handleCancel();
        }
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isEditing, controlledIsEditing]);

  const handleEdit = useCallback(() => {
    if (!controlledIsEditing) {
      setInternalIsEditing(true);
    }
  }, [controlledIsEditing]);

  const handleSave = useCallback(async () => {
    try {
      setIsSaving(true);
      await onSave(editValue);
      if (!controlledIsEditing) {
        setInternalIsEditing(false);
      }
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  }, [editValue, onSave, controlledIsEditing]);

  const handleCancel = useCallback(() => {
    setEditValue(value);
    setSelectedOption(null);
    if (!controlledIsEditing) {
      setInternalIsEditing(false);
    }
    onCancel?.();
  }, [value, controlledIsEditing, onCancel]);

  const handleChange = useCallback(async (newValue: string) => {
    setEditValue(newValue);
    
    if (autoSave) {
      try {
        setIsSaving(true);
        await onSave(newValue);
        if (!controlledIsEditing) {
          setInternalIsEditing(false);
        }
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setIsSaving(false);
      }
    }
  }, [autoSave, onSave, controlledIsEditing]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSave();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      handleCancel();
    }
  }, [handleSave, handleCancel]);

  // Enhanced create option handler that also updates local state
  const enhancedCreateOption = useCallback(async (inputValue: string): Promise<T> => {
    const newOption = await onCreateOption(inputValue);
    setSelectedOption(newOption);
    return newOption;
  }, [onCreateOption]);

  // Get display text for current value
  const getDisplayText = useCallback(() => {
    if (displayText) return displayText;
    if (!value && allowEmpty) return emptyText;
    if (selectedOption) return getDisplayValue(selectedOption);
    return value || emptyText;
  }, [displayText, value, allowEmpty, emptyText, selectedOption, getDisplayValue]);

  if (!isEditing) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full flex items-center h-10 px-3 py-2 rounded-md text-sm",
          "hover:bg-muted/50 transition-all duration-200 cursor-pointer",
          "border border-transparent hover:border-border",
          !value && allowEmpty && "text-muted-foreground italic",
          displayClassName
        )}
        onClick={triggerOnClick ? handleEdit : undefined}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleEdit();
          }
        }}
      >
        <span className="w-full truncate">{getDisplayText()}</span>
      </div>
    );
  }

  // For autoSave mode or when controls are hidden, render the select directly
  if (autoSave || !showControls) {
    return (
      <div ref={containerRef} className="relative">
        <AsyncCreatableSelect
          {...asyncCreatableSelectProps}
          value={editValue}
          onChange={handleChange}
          getDisplayValue={getDisplayValue}
          getOptionValue={getOptionValue}
          onCreateOption={enhancedCreateOption}
          disabled={isSaving}
          triggerClassName={cn(
            "w-full h-10 px-3 py-2 text-sm rounded-md border",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "transition-all duration-200",
            editClassName
          )}
        />
        {isSaving && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
    );
  }

  // For manual save mode with controls
  return (
    <div ref={containerRef} className={cn("w-full flex items-center gap-2 h-10", editClassName)}>
      <div className="relative flex-1">
        <AsyncCreatableSelect
          {...asyncCreatableSelectProps}
          value={editValue}
          onChange={handleChange}
          getDisplayValue={getDisplayValue}
          getOptionValue={getOptionValue}
          onCreateOption={enhancedCreateOption}
          disabled={isSaving}
          triggerClassName={cn(
            "w-full h-10 px-3 py-2 text-sm rounded-md border",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "transition-all duration-200"
          )}
        />
        {isSaving && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={cn(
            "inline-flex items-center justify-center w-6 h-6 rounded",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-colors"
          )}
          aria-label="Save"
        >
          <Check className="h-3 w-3" />
        </button>
        <button
          onClick={handleCancel}
          disabled={isSaving}
          className={cn(
            "inline-flex items-center justify-center w-6 h-6 rounded",
            "bg-muted text-muted-foreground hover:bg-muted/80",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-colors"
          )}
          aria-label="Cancel"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
} 