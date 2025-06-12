# Migration Guide

Guide for migrating from other UI libraries to Shanfu UI.

## 📚 Table of Contents

- [From Material-UI (MUI)](#from-material-ui-mui)
- [From Ant Design](#from-ant-design)
- [From Chakra UI](#from-chakra-ui)
- [From React Bootstrap](#from-react-bootstrap)
- [From shadcn/ui](#from-shadcnui)
- [Common Migration Patterns](#common-migration-patterns)
- [Breaking Changes](#breaking-changes)
- [Codemods](#codemods)

## From Material-UI (MUI)

### Button Component

**Before (MUI):**

```tsx
import { Button } from '@mui/material'
;<Button variant="contained" color="primary" size="large">
  Click me
</Button>
```

**After (Shanfu UI):**

```tsx
import { Button } from '@shanfu/ui'
;<Button variant="default" size="lg">
  Click me
</Button>
```

### TextField → EnhancedInput

**Before (MUI):**

```tsx
import { TextField } from '@mui/material'
;<TextField
  label="Email"
  type="email"
  required
  fullWidth
  error={hasError}
  helperText="Enter your email"
/>
```

**After (Shanfu UI):**

```tsx
import { EnhancedInput } from '@shanfu/ui'
;<EnhancedInput
  placeholder="Email"
  type="email"
  required
  className="w-full"
  validation={[{ rule: (v) => v.includes('@'), message: 'Enter valid email' }]}
/>
```

### Select → AsyncSelect

**Before (MUI):**

```tsx
import { Select, MenuItem } from '@mui/material'
;<Select value={value} onChange={handleChange}>
  <MenuItem value="option1">Option 1</MenuItem>
  <MenuItem value="option2">Option 2</MenuItem>
</Select>
```

**After (Shanfu UI):**

```tsx
import { AsyncSelect } from '@shanfu/ui'
;<AsyncSelect
  fetcher={async () => [
    { id: 'option1', name: 'Option 1' },
    { id: 'option2', name: 'Option 2' },
  ]}
  getDisplayValue={(option) => option.name}
  getOptionValue={(option) => option.id}
  onSelect={handleSelect}
/>
```

### Theme Provider

**Before (MUI):**

```tsx
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

**After (Shanfu UI):**

```tsx
import { ThemeProvider } from '@shanfu/ui'
;<ThemeProvider defaultTheme="dark">
  <App />
</ThemeProvider>
```

## From Ant Design

### Button Component

**Before (Ant Design):**

```tsx
import { Button } from 'antd'
;<Button type="primary" size="large" loading={loading}>
  Submit
</Button>
```

**After (Shanfu UI):**

```tsx
import { Button } from '@shanfu/ui'
;<Button variant="default" size="lg" loading={loading}>
  Submit
</Button>
```

### Input → EnhancedInput

**Before (Ant Design):**

```tsx
import { Input } from 'antd'
;<Input
  placeholder="Enter text"
  prefix={<UserIcon />}
  suffix={<SearchIcon />}
  status={error ? 'error' : ''}
/>
```

**After (Shanfu UI):**

```tsx
import { EnhancedInput } from '@shanfu/ui'
;<EnhancedInput
  placeholder="Enter text"
  icon={<UserIcon />}
  suffix={<SearchIcon />}
  validation={[{ rule: (v) => v.length > 0, message: 'Required field' }]}
/>
```

### Select → AsyncSelect

**Before (Ant Design):**

```tsx
import { Select } from 'antd'
;<Select
  showSearch
  placeholder="Select option"
  filterOption={(input, option) =>
    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
>
  <Option value="1">Option 1</Option>
  <Option value="2">Option 2</Option>
</Select>
```

**After (Shanfu UI):**

```tsx
import { AsyncSelect } from '@shanfu/ui'
;<AsyncSelect
  placeholder="Select option"
  fetcher={async (query) =>
    options.filter((opt) =>
      opt.name.toLowerCase().includes(query.toLowerCase())
    )
  }
  getDisplayValue={(option) => option.name}
  getOptionValue={(option) => option.id}
/>
```

## From Chakra UI

### Button Component

**Before (Chakra UI):**

```tsx
import { Button } from '@chakra-ui/react'
;<Button colorScheme="blue" size="lg" variant="solid">
  Click me
</Button>
```

**After (Shanfu UI):**

```tsx
import { Button } from '@shanfu/ui'
;<Button variant="default" size="lg">
  Click me
</Button>
```

### Input → EnhancedInput

**Before (Chakra UI):**

```tsx
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
;<InputGroup>
  <InputLeftElement>
    <SearchIcon />
  </InputLeftElement>
  <Input placeholder="Search..." />
</InputGroup>
```

**After (Shanfu UI):**

```tsx
import { EnhancedInput } from '@shanfu/ui'
;<EnhancedInput placeholder="Search..." icon={<SearchIcon />} />
```

### Theme Provider

**Before (Chakra UI):**

```tsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
})

<ChakraProvider theme={theme}>
  <App />
</ChakraProvider>
```

**After (Shanfu UI):**

```tsx
import { ThemeProvider } from '@shanfu/ui'
;<ThemeProvider defaultTheme="dark">
  <App />
</ThemeProvider>
```

## From React Bootstrap

### Button Component

**Before (React Bootstrap):**

```tsx
import { Button } from 'react-bootstrap'
;<Button variant="primary" size="lg" disabled={loading}>
  {loading ? 'Loading...' : 'Submit'}
</Button>
```

**After (Shanfu UI):**

```tsx
import { Button } from '@shanfu/ui'
;<Button variant="default" size="lg" loading={loading}>
  Submit
</Button>
```

### Form Control → EnhancedInput

**Before (React Bootstrap):**

```tsx
import { Form } from 'react-bootstrap'

<Form.Control
  type="email"
  placeholder="Enter email"
  isInvalid={hasError}
/>
<Form.Control.Feedback type="invalid">
  Please provide a valid email.
</Form.Control.Feedback>
```

**After (Shanfu UI):**

```tsx
import { EnhancedInput } from '@shanfu/ui'
;<EnhancedInput
  type="email"
  placeholder="Enter email"
  validation={[
    { rule: (v) => v.includes('@'), message: 'Please provide a valid email.' },
  ]}
/>
```

## From shadcn/ui

Shanfu UI is built on top of shadcn/ui, so migration is minimal:

### Direct Component Usage

**Before (shadcn/ui):**

```tsx
// You had to copy components to your project
import { Button } from '@/components/ui/button'
;<Button variant="default">Click me</Button>
```

**After (Shanfu UI):**

```tsx
// Now it's a proper npm package
import { Button } from '@shanfu/ui'
;<Button variant="default">Click me</Button>
```

### Additional Features

Shanfu UI extends shadcn/ui with:

```tsx
// Enhanced components not in shadcn/ui
import {
  InlineEditText,
  AsyncSelect,
  EnhancedInput,
  ThemeToggle
} from '@shanfu/ui'

// Inline editing functionality
<InlineEditText
  value="Click to edit"
  onSave={handleSave}
  InputComponent={YourInput}
/>

// Async data loading
<AsyncSelect
  fetcher={fetchUsers}
  getDisplayValue={(user) => user.name}
  getOptionValue={(user) => user.id}
/>
```

## Common Migration Patterns

### 1. Theme Migration

Most libraries use different theming approaches. Shanfu UI uses CSS variables:

```css
/* Add to your global CSS */
@import '@shanfu/ui/styles.css';

/* Customize theme colors */
:root {
  --primary: 220 90% 56%;
  --secondary: 220 14.3% 95.9%;
  /* ... other variables */
}
```

### 2. Icon Library Migration

```tsx
// Before (various icon libraries)
import { SearchIcon } from '@heroicons/react'
import SearchIcon from '@mui/icons-material/Search'
import { SearchIcon } from '@chakra-ui/icons'

// After (Shanfu UI uses Lucide React)
import { Search } from 'lucide-react'
;<EnhancedInput icon={<Search />} />
```

### 3. Form Validation

**Before (various approaches):**

```tsx
// Manual validation
const [errors, setErrors] = useState({})

const validate = (value) => {
  if (!value) setErrors({ field: 'Required' })
}
```

**After (Shanfu UI):**

```tsx
// Built-in validation
<EnhancedInput
  validation={[
    { rule: (v) => v.length > 0, message: 'Required' },
    { rule: (v) => v.length >= 6, message: 'Min 6 characters' },
  ]}
  onValidation={(isValid) => console.log(isValid)}
/>
```

### 4. Responsive Design

**Before (CSS-in-JS or utility classes):**

```tsx
// Material-UI
<Button sx={{ width: { xs: '100%', md: 'auto' } }}>

// Chakra UI
<Button width={{ base: 'full', md: 'auto' }}>
```

**After (Shanfu UI + Tailwind):**

```tsx
<Button className="w-full md:w-auto">Click me</Button>
```

## Breaking Changes

### Version 1.0.0

No breaking changes - this is the initial release.

### Future Considerations

When upgrading, watch for:

1. **Prop name changes** - We follow shadcn/ui conventions
2. **Theme variable updates** - CSS custom properties may change
3. **Import path changes** - Components may be reorganized
4. **Peer dependency updates** - React, Radix UI versions

## Codemods

We provide automated codemods for common migrations:

### Install Codemod CLI

```bash
npx @shanfu/ui-codemod
```

### Available Transforms

```bash
# Migrate from Material-UI
npx @shanfu/ui-codemod mui-to-shanfu

# Migrate from Ant Design
npx @shanfu/ui-codemod antd-to-shanfu

# Migrate from Chakra UI
npx @shanfu/ui-codemod chakra-to-shanfu

# Update import paths
npx @shanfu/ui-codemod update-imports
```

### Manual Migration Steps

1. **Install Shanfu UI:**

   ```bash
   npm install @shanfu/ui
   npm install lucide-react @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-slot
   ```

2. **Add Theme Provider:**

   ```tsx
   import { ThemeProvider } from '@shanfu/ui'

   function App() {
     return (
       <ThemeProvider defaultTheme="system">{/* Your app */}</ThemeProvider>
     )
   }
   ```

3. **Import Styles:**

   ```tsx
   // In your app root
   import '@shanfu/ui/styles.css'
   ```

4. **Update Component Imports:**

   ```tsx
   // Replace your old imports
   import { Button, Badge, ThemeToggle } from '@shanfu/ui'
   ```

5. **Update Tailwind Config (if using Tailwind):**
   ```js
   module.exports = {
     content: [
       './src/**/*.{js,jsx,ts,tsx}',
       './node_modules/@shanfu/ui/dist/**/*.{js,mjs}',
     ],
     theme: {
       extend: {
         ...require('@shanfu/ui/tailwind').theme.extend,
       },
     },
     plugins: [require('tailwindcss-animate')],
   }
   ```

## Migration Checklist

- [ ] Install Shanfu UI and peer dependencies
- [ ] Add ThemeProvider to app root
- [ ] Import global styles
- [ ] Update component imports
- [ ] Migrate component props and patterns
- [ ] Update theme configuration
- [ ] Test all components
- [ ] Update TypeScript types
- [ ] Remove old library dependencies
- [ ] Update documentation

## Getting Help

If you need help migrating:

1. **Check Examples** - See [examples documentation](./EXAMPLES.md) for patterns
2. **Open Discussion** - [GitHub Discussions](https://github.com/shan2new/shanfu-ui/discussions)
3. **File Issue** - [GitHub Issues](https://github.com/shan2new/shanfu-ui/issues) for bugs
4. **Contact Support** - Open a [GitHub Discussion](https://github.com/shan2new/shanfu-ui/discussions) for help

## Performance Tips

After migration:

1. **Use Tree Shaking** - Import only components you need
2. **Optimize Bundle** - Use dynamic imports for large components
3. **CSS Optimization** - Purge unused Tailwind classes
4. **TypeScript** - Enable strict mode for better performance

```tsx
// Tree shaking - good
import { Button } from '@shanfu/ui'

// Bundle everything - avoid
import * as ShanfuUI from '@shanfu/ui'
```

---

_Need more help? Check our [API documentation](./API.md) or reach out to the community!_
