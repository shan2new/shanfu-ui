import { useState, useCallback } from 'react'
import { Plus } from 'lucide-react'
import { AsyncSelect, AsyncSelectProps, Option } from './AsyncSelect'
import { cn } from '../../lib/utils'

export interface AsyncCreatableSelectProps<T>
  extends Omit<AsyncSelectProps<T>, 'fetcher'> {
  /** Async function to fetch options */
  fetcher: (query?: string) => Promise<T[]>
  /** Function to create a new option */
  onCreateOption: (inputValue: string) => Promise<T>
  /** Function to check if a value can be created */
  isValidNewOption?: (inputValue: string, options: T[]) => boolean
  /** Message to show for creating new option */
  createMessage?: (inputValue: string) => string
  /** Loading message when creating */
  creatingMessage?: string
  /** Allow creating new options */
  allowCreate?: boolean
}

export function AsyncCreatableSelect<T>({
  fetcher,
  onCreateOption,
  isValidNewOption,
  createMessage = (inputValue) => `Create "${inputValue}"`,
  creatingMessage = 'Creating...',
  allowCreate = true,
  getOptionValue,
  renderOption,
  ...props
}: AsyncCreatableSelectProps<T>) {
  const [isCreating, setIsCreating] = useState(false)
  const [options, setOptions] = useState<T[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const enhancedFetcher = useCallback(
    async (query?: string) => {
      const fetchedOptions = await fetcher(query)
      setOptions(fetchedOptions)
      setSearchTerm(query || '')
      return fetchedOptions
    },
    [fetcher]
  )

  const handleCreateOption = useCallback(async () => {
    if (!searchTerm.trim() || isCreating) return

    try {
      setIsCreating(true)
      const newOption = await onCreateOption(searchTerm.trim())
      setOptions((prev) => [newOption, ...prev])
      props.onChange(getOptionValue(newOption))
    } catch (error) {
      console.error('Error creating option:', error)
    } finally {
      setIsCreating(false)
    }
  }, [searchTerm, onCreateOption, getOptionValue, props, isCreating])

  const shouldShowCreateOption = useCallback(() => {
    if (!allowCreate || !searchTerm.trim() || isCreating) return false

    const trimmedTerm = searchTerm.trim()
    const existingOption = options.find(
      (option) =>
        getOptionValue(option).toLowerCase() === trimmedTerm.toLowerCase()
    )

    if (existingOption) return false

    if (isValidNewOption) {
      return isValidNewOption(trimmedTerm, options)
    }

    return true
  }, [
    allowCreate,
    searchTerm,
    isCreating,
    options,
    getOptionValue,
    isValidNewOption,
  ])

  const enhancedRenderOption = useCallback(
    (option: T) => {
      // Check if this is a create option
      const optionValue = getOptionValue(option)
      if (optionValue.startsWith('__create__')) {
        const inputValue = optionValue.replace('__create__', '')
        return (
          <div className="flex items-center">
            <Plus className="text-primary mr-2 h-4 w-4" />
            <span className="text-primary">
              {isCreating ? creatingMessage : createMessage(inputValue)}
            </span>
          </div>
        )
      }

      return renderOption(option)
    },
    [renderOption, getOptionValue, createMessage, creatingMessage, isCreating]
  )

  // Create a wrapper that adds create option to the fetched options
  const wrapperFetcher = useCallback(
    async (query?: string): Promise<T[]> => {
      const fetchedOptions = await enhancedFetcher(query)

      // Add create option if valid
      if (shouldShowCreateOption() && query) {
        const createOption = {
          value: `__create__${query}`,
          label: createMessage(query),
          __isCreateOption: true,
        } as unknown as T

        return [...fetchedOptions, createOption]
      }

      return fetchedOptions
    },
    [enhancedFetcher, shouldShowCreateOption, createMessage]
  )

  const handleSelect = useCallback(
    (value: string) => {
      if (value.startsWith('__create__')) {
        handleCreateOption()
        return
      }
      props.onChange(value)
    },
    [handleCreateOption, props]
  )

  return (
    <AsyncSelect
      {...props}
      fetcher={wrapperFetcher}
      onChange={handleSelect}
      getOptionValue={getOptionValue}
      renderOption={enhancedRenderOption}
    />
  )
}
