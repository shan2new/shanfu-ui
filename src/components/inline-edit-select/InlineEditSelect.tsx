import * as React from 'react'
import { cn } from '../../lib/utils'

export interface InlineEditSelectOption {
  value: string
  label: string
}

export interface InlineEditSelectProps {
  value: string
  onSave: (value: string) => Promise<void> | void
  options: InlineEditSelectOption[] | (() => Promise<InlineEditSelectOption[]>)
  placeholder?: string
  displayPlaceholder?: string
  className?: string
  disabled?: boolean
  displayClassName?: string
  editClassName?: string
  getDisplayValue?: (value: string, options: InlineEditSelectOption[]) => string
  // Shadcn Select component props
  SelectComponent: React.ComponentType<any>
  SelectContentComponent: React.ComponentType<any>
  SelectItemComponent: React.ComponentType<any>
  SelectTriggerComponent: React.ComponentType<any>
  SelectValueComponent: React.ComponentType<any>
}

export function InlineEditSelect({
  value,
  onSave,
  options,
  placeholder = 'Select option',
  displayPlaceholder = 'Click to select',
  className,
  disabled = false,
  displayClassName,
  editClassName,
  getDisplayValue,
  SelectComponent,
  SelectContentComponent,
  SelectItemComponent,
  SelectTriggerComponent,
  SelectValueComponent,
}: InlineEditSelectProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editValue, setEditValue] = React.useState(value)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [resolvedOptions, setResolvedOptions] = React.useState<
    InlineEditSelectOption[]
  >([])

  React.useEffect(() => {
    setEditValue(value)
  }, [value])

  React.useEffect(() => {
    const loadOptions = async () => {
      if (Array.isArray(options)) {
        setResolvedOptions(options)
      } else {
        try {
          const loadedOptions = await options()
          setResolvedOptions(loadedOptions)
        } catch (error) {
          console.error('Failed to load options:', error)
          setResolvedOptions([])
        }
      }
    }

    loadOptions()
  }, [options])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isEditing) {
        handleCancel()
      }
    }

    if (isEditing) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isEditing])

  const handleEdit = () => {
    if (disabled) return
    setIsEditing(true)
    setEditValue(value)
  }

  const handleSave = async () => {
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      await onSave(editValue)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to save:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleValueChange = async (newValue: string) => {
    setEditValue(newValue)
    // Auto-save on selection
    if (!isSubmitting) {
      setIsSubmitting(true)
      try {
        await onSave(newValue)
        setIsEditing(false)
      } catch (error) {
        console.error('Failed to save:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const getDisplayText = () => {
    if (!value) return displayPlaceholder

    if (getDisplayValue) {
      return getDisplayValue(value, resolvedOptions)
    }

    const option = resolvedOptions.find((opt) => opt.value === value)
    return option ? option.label : value
  }

  if (isEditing) {
    return (
      <SelectComponent
        value={editValue}
        onValueChange={handleValueChange}
        disabled={isSubmitting}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setIsEditing(false)
          }
        }}
      >
        <SelectTriggerComponent
          className={cn(
            'h-10 w-full rounded-md border px-3 py-2',
            'focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none',
            'transition-all duration-200',
            'text-sm',
            className,
            editClassName
          )}
          style={{ fontSize: '0.875rem' }}
        >
          <SelectValueComponent placeholder={placeholder} />
        </SelectTriggerComponent>
        <SelectContentComponent>
          {resolvedOptions.map((option) => (
            <SelectItemComponent key={option.value} value={option.value}>
              {option.label}
            </SelectItemComponent>
          ))}
        </SelectContentComponent>
      </SelectComponent>
    )
  }

  return (
    <div
      className={cn(
        'flex h-10 w-full items-center rounded-md px-3 py-2 text-sm',
        'hover:bg-muted/50 cursor-pointer transition-all duration-200',
        'hover:border-border border border-transparent',
        disabled &&
          'cursor-not-allowed opacity-50 hover:border-transparent hover:bg-transparent',
        className
      )}
      onClick={handleEdit}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault()
          handleEdit()
        }
      }}
      aria-label={`Edit ${getDisplayText()}`}
    >
      <span
        className={cn(
          'w-full truncate text-sm',
          !value && 'text-muted-foreground italic',
          displayClassName
        )}
      >
        {getDisplayText()}
      </span>
    </div>
  )
}
