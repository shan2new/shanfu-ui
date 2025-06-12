# API Reference

Complete API documentation for Shanfu UI components.

## 📚 Table of Contents

- [Inline Editing Components](#inline-editing-components)
- [Enhanced Form Controls](#enhanced-form-controls)
- [Async Components](#async-components)
- [UI Primitives](#ui-primitives)
- [Theme & Layout](#theme--layout)
- [Utilities](#utilities)

## Inline Editing Components

### InlineText

Inline text editing component with save/cancel functionality.

```tsx
import { InlineText } from '@shanfu/ui'
;<InlineText
  value="Edit me"
  onSave={(value) => console.log(value)}
  InputComponent={MyInput}
/>
```

#### Props

| Prop             | Type                                       | Default | Description              |
| ---------------- | ------------------------------------------ | ------- | ------------------------ |
| `value`          | `string`                                   | -       | Current text value       |
| `onSave`         | `(value: string) => void \| Promise<void>` | -       | Save handler             |
| `placeholder`    | `string`                                   | -       | Placeholder text         |
| `InputComponent` | `React.ComponentType<any>`                 | -       | Input component to use   |
| `disabled`       | `boolean`                                  | `false` | Disable editing          |
| `className`      | `string`                                   | -       | Additional CSS classes   |
| `readOnly`       | `boolean`                                  | `false` | Read-only mode           |
| `maxLength`      | `number`                                   | -       | Maximum character length |

#### Methods

| Method         | Type         | Description                    |
| -------------- | ------------ | ------------------------------ |
| `startEdit()`  | `() => void` | Programmatically start editing |
| `cancelEdit()` | `() => void` | Cancel current edit            |
| `saveEdit()`   | `() => void` | Save current edit              |

---

### InlineTextarea

Inline textarea editing for multi-line text.

```tsx
import { InlineTextarea } from '@shanfu/ui'
;<InlineTextarea
  value="Multi-line\ntext content"
  onSave={(value) => console.log(value)}
  TextareaComponent={MyTextarea}
/>
```

#### Props

| Prop                | Type                                       | Default | Description               |
| ------------------- | ------------------------------------------ | ------- | ------------------------- |
| `value`             | `string`                                   | -       | Current textarea value    |
| `onSave`            | `(value: string) => void \| Promise<void>` | -       | Save handler              |
| `placeholder`       | `string`                                   | -       | Placeholder text          |
| `TextareaComponent` | `React.ComponentType<any>`                 | -       | Textarea component to use |
| `disabled`          | `boolean`                                  | `false` | Disable editing           |
| `className`         | `string`                                   | -       | Additional CSS classes    |
| `rows`              | `number`                                   | `3`     | Default number of rows    |
| `maxLength`         | `number`                                   | -       | Maximum character length  |

---

### InlineSelect

Inline select dropdown with customizable options.

```tsx
import { InlineSelect } from '@shanfu/ui'
;<InlineSelect
  value="option1"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  onSave={(value) => console.log(value)}
/>
```

#### Props

| Prop          | Type                                       | Default     | Description             |
| ------------- | ------------------------------------------ | ----------- | ----------------------- |
| `value`       | `string`                                   | -           | Current selected value  |
| `options`     | `Option[]`                                 | -           | Array of select options |
| `onSave`      | `(value: string) => void \| Promise<void>` | -           | Save handler            |
| `disabled`    | `boolean`                                  | `false`     | Disable editing         |
| `className`   | `string`                                   | -           | Additional CSS classes  |
| `placeholder` | `string`                                   | "Select..." | Placeholder text        |

#### Types

```typescript
interface Option {
  value: string
  label: string
  disabled?: boolean
}
```

## Enhanced Form Controls

### EnhancedInput

Feature-rich input component with validation and styling.

```tsx
import { EnhancedInput } from '@shanfu/ui'
;<EnhancedInput
  placeholder="Enter text"
  type="email"
  required
  onValidation={(isValid) => console.log(isValid)}
/>
```

#### Props

| Prop           | Type                         | Default  | Description            |
| -------------- | ---------------------------- | -------- | ---------------------- |
| `type`         | `InputType`                  | `"text"` | Input type             |
| `placeholder`  | `string`                     | -        | Placeholder text       |
| `required`     | `boolean`                    | `false`  | Required field         |
| `disabled`     | `boolean`                    | `false`  | Disable input          |
| `className`    | `string`                     | -        | Additional CSS classes |
| `validation`   | `ValidationRule[]`           | -        | Validation rules       |
| `onValidation` | `(isValid: boolean) => void` | -        | Validation callback    |
| `icon`         | `React.ReactNode`            | -        | Leading icon           |
| `suffix`       | `React.ReactNode`            | -        | Trailing content       |

#### Types

```typescript
type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'

interface ValidationRule {
  rule: (value: string) => boolean
  message: string
}
```

---

### EnhancedTextarea

Advanced textarea with character count and validation.

```tsx
import { EnhancedTextarea } from '@shanfu/ui'
;<EnhancedTextarea
  placeholder="Enter description"
  maxLength={500}
  showCharacterCount
  rows={4}
/>
```

#### Props

| Prop                 | Type                         | Default | Description              |
| -------------------- | ---------------------------- | ------- | ------------------------ |
| `placeholder`        | `string`                     | -       | Placeholder text         |
| `rows`               | `number`                     | `3`     | Number of rows           |
| `maxLength`          | `number`                     | -       | Maximum character length |
| `showCharacterCount` | `boolean`                    | `false` | Show character counter   |
| `disabled`           | `boolean`                    | `false` | Disable textarea         |
| `className`          | `string`                     | -       | Additional CSS classes   |
| `validation`         | `ValidationRule[]`           | -       | Validation rules         |
| `onValidation`       | `(isValid: boolean) => void` | -       | Validation callback      |

## Async Components

### AsyncSelect

Select component with asynchronous data loading.

```tsx
import { AsyncSelect } from '@shanfu/ui'
;<AsyncSelect
  fetcher={async (query) => fetchOptions(query)}
  getDisplayValue={(option) => option.name}
  getOptionValue={(option) => option.id}
  onSelect={(option) => console.log(option)}
/>
```

#### Props

| Prop              | Type                              | Default     | Description            |
| ----------------- | --------------------------------- | ----------- | ---------------------- |
| `fetcher`         | `(query: string) => Promise<T[]>` | -           | Async data fetcher     |
| `getDisplayValue` | `(option: T) => string`           | -           | Display value getter   |
| `getOptionValue`  | `(option: T) => string`           | -           | Option value getter    |
| `onSelect`        | `(option: T) => void`             | -           | Selection handler      |
| `placeholder`     | `string`                          | "Search..." | Placeholder text       |
| `debounceMs`      | `number`                          | `300`       | Search debounce delay  |
| `minQueryLength`  | `number`                          | `1`         | Minimum query length   |
| `disabled`        | `boolean`                         | `false`     | Disable component      |
| `className`       | `string`                          | -           | Additional CSS classes |

---

### AsyncCreatableSelect

Async select with the ability to create new options.

```tsx
import { AsyncCreatableSelect } from '@shanfu/ui'
;<AsyncCreatableSelect
  fetcher={async (query) => fetchOptions(query)}
  onCreateOption={async (inputValue) => createOption(inputValue)}
  getDisplayValue={(option) => option.name}
  getOptionValue={(option) => option.id}
/>
```

#### Props

Extends `AsyncSelect` props plus:

| Prop                | Type                                 | Default  | Description            |
| ------------------- | ------------------------------------ | -------- | ---------------------- |
| `onCreateOption`    | `(inputValue: string) => Promise<T>` | -        | Create option handler  |
| `createOptionLabel` | `string`                             | "Create" | Create option label    |
| `allowCreate`       | `boolean`                            | `true`   | Allow creating options |

## UI Primitives

### Button

Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@shanfu/ui'
;<Button variant="default" size="md" onClick={handleClick}>
  Click me
</Button>
```

#### Props

| Prop           | Type                | Default     | Description             |
| -------------- | ------------------- | ----------- | ----------------------- |
| `variant`      | `ButtonVariant`     | `"default"` | Button style variant    |
| `size`         | `ButtonSize`        | `"default"` | Button size             |
| `disabled`     | `boolean`           | `false`     | Disable button          |
| `loading`      | `boolean`           | `false`     | Show loading state      |
| `icon`         | `React.ReactNode`   | -           | Leading icon            |
| `iconPosition` | `"left" \| "right"` | `"left"`    | Icon position           |
| `asChild`      | `boolean`           | `false`     | Render as child element |
| `className`    | `string`            | -           | Additional CSS classes  |

#### Types

```typescript
type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'

type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'
```

---

### Badge

Status and label badges with theming support.

```tsx
import { Badge } from '@shanfu/ui'

<Badge variant="default">New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
```

#### Props

| Prop        | Type              | Default     | Description            |
| ----------- | ----------------- | ----------- | ---------------------- |
| `variant`   | `BadgeVariant`    | `"default"` | Badge style variant    |
| `size`      | `BadgeSize`       | `"default"` | Badge size             |
| `className` | `string`          | -           | Additional CSS classes |
| `children`  | `React.ReactNode` | -           | Badge content          |

#### Types

```typescript
type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info'

type BadgeSize = 'default' | 'sm' | 'lg'
```

---

### DropdownMenu

Accessible dropdown menu system with keyboard navigation.

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@shanfu/ui'
;<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Item 3</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### Components

- `DropdownMenu` - Root container
- `DropdownMenuTrigger` - Trigger element
- `DropdownMenuContent` - Content container
- `DropdownMenuItem` - Menu item
- `DropdownMenuSeparator` - Visual separator
- `DropdownMenuLabel` - Menu section label
- `DropdownMenuGroup` - Menu item group

## Theme & Layout

### ThemeProvider

Theme context provider for dark/light mode switching.

```tsx
import { ThemeProvider } from '@shanfu/ui'
;<ThemeProvider defaultTheme="system" storageKey="ui-theme">
  <App />
</ThemeProvider>
```

#### Props

| Prop           | Type              | Default      | Description      |
| -------------- | ----------------- | ------------ | ---------------- |
| `defaultTheme` | `Theme`           | `"system"`   | Default theme    |
| `storageKey`   | `string`          | `"ui-theme"` | localStorage key |
| `children`     | `React.ReactNode` | -            | App content      |

#### Types

```typescript
type Theme = 'dark' | 'light' | 'system'
```

#### Hook

```tsx
import { useTheme } from '@shanfu/ui'

const { theme, setTheme, themes } = useTheme()
```

---

### ThemeToggle

Theme switcher component with dropdown.

```tsx
import { ThemeToggle } from '@shanfu/ui'
;<ThemeToggle />
```

#### Props

| Prop        | Type         | Default     | Description            |
| ----------- | ------------ | ----------- | ---------------------- |
| `className` | `string`     | -           | Additional CSS classes |
| `size`      | `ButtonSize` | `"default"` | Button size            |

---

### Navigation

Professional navigation bar with mobile support.

```tsx
import { Navigation } from '@shanfu/ui'
;<Navigation
  title="Shanfu UI"
  links={[
    { href: '/docs', label: 'Documentation' },
    { href: '/examples', label: 'Examples' },
  ]}
/>
```

#### Props

| Prop              | Type        | Default | Description            |
| ----------------- | ----------- | ------- | ---------------------- |
| `title`           | `string`    | -       | Navigation title       |
| `links`           | `NavLink[]` | -       | Navigation links       |
| `className`       | `string`    | -       | Additional CSS classes |
| `showThemeToggle` | `boolean`   | `true`  | Show theme toggle      |

#### Types

```typescript
interface NavLink {
  href: string
  label: string
  external?: boolean
}
```

---

### Layout

Documentation-style layout system.

```tsx
import { Layout } from '@shanfu/ui'
;<Layout sidebar={<Sidebar />}>
  <main>Content</main>
</Layout>
```

#### Props

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `sidebar`   | `React.ReactNode` | -       | Sidebar content        |
| `children`  | `React.ReactNode` | -       | Main content           |
| `className` | `string`          | -       | Additional CSS classes |

## Utilities

### cn (className utility)

Utility for merging Tailwind CSS classes.

```tsx
import { cn } from '@shanfu/ui'

const className = cn(
  'base-class',
  condition && 'conditional-class',
  props.className
)
```

### Theme Colors

CSS custom properties for theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 45.1%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 45.1%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
  --radius: 0.5rem;
}
```

## TypeScript Support

All components include full TypeScript definitions:

```typescript
// Import types
import type {
  ButtonProps,
  BadgeProps,
  ThemeProviderProps
} from '@shanfu/ui'

// Use with generic components
const MyAsyncSelect = () => {
  return (
    <AsyncSelect<MyOptionType>
      fetcher={fetchMyOptions}
      getDisplayValue={(option) => option.name}
      getOptionValue={(option) => option.id}
    />
  )
}
```

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- **Keyboard Navigation** - Full keyboard support
- **Screen Readers** - ARIA labels and descriptions
- **Focus Management** - Proper focus handling
- **Color Contrast** - Meets contrast requirements
- **Semantic HTML** - Uses appropriate HTML elements

## Browser Support

- **Chrome** 88+
- **Firefox** 85+
- **Safari** 14+
- **Edge** 88+

## Performance

- **Tree Shaking** - Import only what you need
- **Bundle Size** - Optimized for minimal impact
- **Runtime** - Efficient React patterns
- **CSS** - Optimized Tailwind output

For more examples and guides, see the [main documentation](../README.md).
