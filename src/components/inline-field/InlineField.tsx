import * as React from "react";
import { cn } from "../../lib/utils";

export interface InlineFieldProps<T = unknown> {
  value: T;
  onSave: (next: T) => Promise<void> | void;
  renderDisplay: (value: T) => React.ReactNode;
  renderEditor: (
    state: EditorState<T>
  ) => React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface EditorState<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  submit: () => Promise<void>;
  cancel: () => void;
  isSubmitting: boolean;
}

export function InlineField<T>({
  value,
  onSave,
  renderDisplay,
  renderEditor,
  className,
  disabled,
}: InlineFieldProps<T>) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!editing) {
      setDraft(value);
    }
  }, [value, editing]);

  const submit = React.useCallback(async () => {
    if (disabled) return;
    setLoading(true);
    try {
      await onSave(draft);
      setEditing(false);
    } finally {
      setLoading(false);
    }
  }, [disabled, draft, onSave]);

  const cancel = React.useCallback(() => {
    setDraft(value);
    setEditing(false);
  }, [value]);

  const state = React.useMemo<EditorState<T>>(
    () => ({
      value: draft,
      setValue: setDraft,
      submit,
      cancel,
      isSubmitting: loading,
    }),
    [draft, loading, submit, cancel]
  );

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      cancel();
    }
  }, [cancel]);

  React.useEffect(() => {
    if (editing) {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          cancel();
        }
      };
      document.addEventListener('keydown', handler, { capture: true });
      return () => document.removeEventListener('keydown', handler, { capture: true });
    }
  }, [editing, cancel]);

  if (editing) {
    return (
      <div className={cn(
        "inline-edit-container",
        "bg-blue-50 border-blue-200 border rounded-md px-3 py-2",
        "h-[44px] flex items-center w-full",
        "text-base leading-relaxed font-sans font-normal",
        className
      )}>
        <div className="flex-1 min-w-0 w-full text-base leading-relaxed font-sans font-normal" onBlur={submit}>
          {renderEditor(state)}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative inline-flex items-center rounded-md transition-all duration-200 min-w-fit",
        !disabled && "border border-transparent cursor-pointer px-3 py-2",
        !disabled && "hover:bg-blue-50/80 hover:border-blue-300 hover:shadow-sm",
        disabled && "cursor-not-allowed opacity-60",
        "h-[44px] w-full",
        "text-base leading-relaxed font-sans font-normal",
        className
      )}
      onClick={() => !disabled && setEditing(true)}
      title={disabled ? "Editing disabled" : "Click to edit"}
    >
      <div className="flex-1 min-w-0 w-full text-base leading-relaxed font-sans font-normal">
        {renderDisplay(value)}
      </div>
    </div>
  );
} 