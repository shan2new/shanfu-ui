import * as React from 'react'
import { InlineField, EditorState } from '../inline-field/InlineField'

interface InlineTextProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string
  onSave: (v: string) => Promise<void> | void
  placeholder?: string
  InputComponent?: React.ComponentType<any>
}

export function InlineText({
  value,
  onSave,
  placeholder = 'Click to add text...',
  InputComponent,
  ...rest
}: InlineTextProps) {
  if (!InputComponent) {
    throw new Error(
      'InlineText requires an InputComponent prop. Please provide a shadcn Input component.'
    )
  }

  return (
    <InlineField
      value={value}
      onSave={onSave}
      renderDisplay={(v) =>
        v ? (
          <span className="text-foreground">{v}</span>
        ) : (
          <span className="text-muted-foreground italic">{placeholder}</span>
        )
      }
      renderEditor={({ value: v, setValue, submit }: EditorState<string>) => (
        <InputComponent
          {...rest}
          value={v}
          autoFocus
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              e.stopPropagation()
              submit()
            }
            // Let Escape bubble up to InlineField's handler
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          className="text-foreground placeholder:text-muted-foreground h-auto border-none bg-transparent px-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Enter text..."
        />
      )}
    />
  )
}
