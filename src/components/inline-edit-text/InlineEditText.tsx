import * as React from 'react'
import { cn } from '../../lib/utils'
import { EnhancedInput } from '../enhanced-input/EnhancedInput'

export interface InlineEditTextProps {
  value: string
  onSave: (value: string) => Promise<void> | void
  placeholder?: string
  InputComponent: React.ComponentType<any>
  className?: string
  disabled?: boolean
  displayClassName?: string
  editClassName?: string
}

export function InlineEditText({
  value,
  onSave,
  placeholder = 'Click to edit',
  InputComponent,
  className,
  disabled = false,
  displayClassName,
  editClassName,
}: InlineEditTextProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editValue, setEditValue] = React.useState(value)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    setEditValue(value)
  }, [value])

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
  }

  if (isEditing) {
    return (
      <EnhancedInput
        InputComponent={InputComponent}
        value={editValue}
        onValueChange={setEditValue}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        placeholder={placeholder}
        disabled={isSubmitting}
        className={cn(
          'h-10 w-full rounded-md border border-transparent px-3 py-2',
          'focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none',
          'focus:border-border',
          'transition-all duration-200',
          'text-sm',
          className,
          editClassName
        )}
        style={{ fontSize: '0.875rem' }}
        autoFocus
      />
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
      aria-label={`Edit ${value || placeholder}`}
    >
      <span
        className={cn(
          'w-full truncate text-sm',
          !value && 'text-muted-foreground italic',
          displayClassName
        )}
      >
        {value || placeholder}
      </span>
    </div>
  )
}
