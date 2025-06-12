# Troubleshooting Guide

Common issues and solutions when using Shanfu UI.

## 📚 Table of Contents

- [Installation Issues](#installation-issues)
- [TypeScript Errors](#typescript-errors)
- [Styling Problems](#styling-problems)
- [Component Issues](#component-issues)
- [Build & Bundle Issues](#build--bundle-issues)
- [Performance Problems](#performance-problems)
- [Browser Compatibility](#browser-compatibility)

## Installation Issues

### Error: Peer dependency warnings

**Problem:**

```bash
npm WARN peer dep missing: react@^18.0.0, required by @shanfu/ui@1.0.0
npm WARN peer dep missing: @radix-ui/react-dropdown-menu@^2.0.0
```

**Solution:**
Install all peer dependencies:

```bash
npm install react react-dom lucide-react @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-slot
```

### Error: Module resolution failed

**Problem:**

```
Cannot resolve module '@shanfu/ui'
```

**Solutions:**

1. Check package.json:

   ```json
   {
     "dependencies": {
       "@shanfu/ui": "^1.0.0"
     }
   }
   ```

2. Clear node_modules and reinstall:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. For TypeScript projects, ensure proper module resolution:
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "moduleResolution": "node",
       "esModuleInterop": true
     }
   }
   ```

## TypeScript Errors

### Error: Property does not exist on type

**Problem:**

```typescript
Property 'variant' does not exist on type 'ButtonProps'
```

**Solution:**
Ensure you're importing types correctly:

```typescript
import { Button, type ButtonProps } from '@shanfu/ui'

// Or use the component directly
const MyButton: React.FC = () => {
  return <Button variant="default">Click me</Button>
}
```

### Error: Generic type constraints

**Problem:**

```typescript
Type 'MyOption' does not satisfy the constraint
```

**Solution:**
Define your option type properly:

```typescript
interface MyOption {
  id: string
  name: string
  // Add any additional properties
}

<AsyncSelect<MyOption>
  fetcher={fetchOptions}
  getDisplayValue={(option) => option.name}
  getOptionValue={(option) => option.id}
/>
```

### Error: Event handler types

**Problem:**

```typescript
Type '(value: string) => void' is not assignable to type '(value: string) => Promise<void>'
```

**Solution:**
Make your handler async or return void explicitly:

```typescript
// Option 1: Make it async
const handleSave = async (value: string) => {
  await saveToServer(value)
}

// Option 2: Return void explicitly
const handleSave = (value: string): void => {
  saveToServer(value)
}
```

## Styling Problems

### Styles not loading

**Problem:**
Components appear unstyled or have broken layouts.

**Solutions:**

1. **Import the CSS file:**

   ```typescript
   // In your app root (main.tsx, index.tsx, or _app.tsx)
   import '@shanfu/ui/styles.css'
   ```

2. **For Next.js with app directory:**

   ```typescript
   // app/layout.tsx
   import '@shanfu/ui/styles.css'

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode
   }) {
     return (
       <html lang="en">
         <body>{children}</body>
       </html>
     )
   }
   ```

3. **For Vite projects:**

   ```typescript
   // main.tsx
   import React from 'react'
   import ReactDOM from 'react-dom/client'
   import '@shanfu/ui/styles.css'
   import App from './App'

   ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
   ```

### Tailwind conflicts

**Problem:**
Your existing Tailwind styles conflict with Shanfu UI styles.

**Solution:**
Update your Tailwind configuration:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // Add Shanfu UI to content paths
    './node_modules/@shanfu/ui/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      // Import Shanfu UI theme extensions
      ...require('@shanfu/ui/tailwind').theme.extend,
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

### Dark mode not working

**Problem:**
Theme toggle doesn't switch between light and dark modes.

**Solutions:**

1. **Wrap app with ThemeProvider:**

   ```tsx
   import { ThemeProvider } from '@shanfu/ui'

   function App() {
     return (
       <ThemeProvider defaultTheme="system" storageKey="ui-theme">
         {/* Your app content */}
       </ThemeProvider>
     )
   }
   ```

2. **Configure Tailwind for dark mode:**

   ```javascript
   // tailwind.config.js
   module.exports = {
     darkMode: ['class'],
     // ... rest of config
   }
   ```

3. **Check CSS custom properties:**
   Make sure your CSS includes dark mode variables:
   ```css
   .dark {
     --background: 0 0% 3.9%;
     --foreground: 0 0% 98%;
     /* ... other dark mode variables */
   }
   ```

## Component Issues

### InlineEdit components not saving

**Problem:**
`onSave` callback is not triggered or throws errors.

**Solutions:**

1. **Check async handling:**

   ```tsx
   <InlineEditText
     value={value}
     onSave={async (newValue) => {
       try {
         await api.updateValue(newValue)
         setValue(newValue) // Update local state
       } catch (error) {
         console.error('Save failed:', error)
         // Handle error appropriately
       }
     }}
   />
   ```

2. **Provide InputComponent:**

   ```tsx
   import { EnhancedInput } from '@shanfu/ui'
   ;<InlineEditText
     value={value}
     onSave={handleSave}
     InputComponent={EnhancedInput} // Required prop
   />
   ```

### AsyncSelect not loading data

**Problem:**
Dropdown doesn't show options or fetcher isn't called.

**Solutions:**

1. **Check fetcher function:**

   ```tsx
   const fetchOptions = async (query: string) => {
     // Must return a promise
     const response = await fetch(`/api/options?q=${query}`)
     if (!response.ok) {
       throw new Error('Failed to fetch')
     }
     return response.json()
   }

   ;<AsyncSelect
     fetcher={fetchOptions}
     getDisplayValue={(option) => option.label}
     getOptionValue={(option) => option.value}
     onSelect={handleSelect}
   />
   ```

2. **Verify minimum query length:**
   ```tsx
   <AsyncSelect
     fetcher={fetchOptions}
     minQueryLength={1} // Default is 1
     debounceMs={300} // Default is 300ms
     // ... other props
   />
   ```

### Validation not working

**Problem:**
Form validation doesn't trigger or show error messages.

**Solution:**
Check validation rule format:

```tsx
<EnhancedInput
  validation={[
    {
      rule: (value) => value.length > 0, // Must return boolean
      message: 'This field is required',
    },
    {
      rule: async (value) => {
        // Async rules supported
        const isValid = await validateOnServer(value)
        return isValid
      },
      message: 'Server validation failed',
    },
  ]}
  onValidation={(isValid) => {
    console.log('Validation result:', isValid)
  }}
/>
```

## Build & Bundle Issues

### Build fails with TypeScript errors

**Problem:**

```
error TS2307: Cannot find module '@shanfu/ui' or its corresponding type declarations
```

**Solution:**

1. Check TypeScript configuration:

   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "moduleResolution": "node",
       "allowSyntheticDefaultImports": true,
       "esModuleInterop": true,
       "jsx": "react-jsx"
     }
   }
   ```

2. Clear TypeScript cache:
   ```bash
   rm -rf node_modules/.cache
   npx tsc --build --clean
   ```

### Bundle size too large

**Problem:**
Final bundle includes entire Shanfu UI library.

**Solutions:**

1. **Use tree shaking:**

   ```tsx
   // Good: Import only what you need
   import { Button, Badge } from '@shanfu/ui'

   // Bad: Imports everything
   import * as ShanfuUI from '@shanfu/ui'
   ```

2. **Configure bundler for tree shaking:**

   ```javascript
   // webpack.config.js
   module.exports = {
     optimization: {
       usedExports: true,
       sideEffects: false,
     },
   }

   // vite.config.ts
   export default defineConfig({
     build: {
       rollupOptions: {
         external: ['react', 'react-dom'],
       },
     },
   })
   ```

### CSS not bundled correctly

**Problem:**
Styles missing in production build.

**Solutions:**

1. **For Vite:**

   ```typescript
   // vite.config.ts
   export default defineConfig({
     css: {
       postcss: {
         plugins: [require('tailwindcss'), require('autoprefixer')],
       },
     },
   })
   ```

2. **For webpack:**
   ```javascript
   // webpack.config.js
   module.exports = {
     module: {
       rules: [
         {
           test: /\.css$/,
           use: ['style-loader', 'css-loader', 'postcss-loader'],
         },
       ],
     },
   }
   ```

## Performance Problems

### Slow async select responses

**Problem:**
Dropdown takes too long to load options.

**Solutions:**

1. **Optimize debouncing:**

   ```tsx
   <AsyncSelect
     fetcher={fetchOptions}
     debounceMs={150} // Reduce from default 300ms
     minQueryLength={2} // Increase to reduce API calls
   />
   ```

2. **Implement caching:**

   ```tsx
   const cache = new Map()

   const fetchWithCache = async (query: string) => {
     if (cache.has(query)) {
       return cache.get(query)
     }

     const result = await api.search(query)
     cache.set(query, result)
     return result
   }
   ```

3. **Use virtual scrolling for large lists:**

   ```tsx
   import { FixedSizeList } from 'react-window'
   ;<AsyncSelect
     fetcher={fetchOptions}
     renderOptions={(options) => (
       <FixedSizeList height={200} itemCount={options.length} itemSize={35}>
         {({ index, style }) => <div style={style}>{options[index].label}</div>}
       </FixedSizeList>
     )}
   />
   ```

### Memory leaks

**Problem:**
Components not cleaning up properly.

**Solutions:**

1. **Clean up subscriptions:**

   ```tsx
   useEffect(() => {
     const subscription = api.subscribe(handler)

     return () => {
       subscription.unsubscribe()
     }
   }, [])
   ```

2. **Cancel async operations:**

   ```tsx
   useEffect(() => {
     const abortController = new AbortController()

     fetch('/api/data', { signal: abortController.signal })
       .then((response) => response.json())
       .then(setData)
       .catch((error) => {
         if (error.name !== 'AbortError') {
           console.error(error)
         }
       })

     return () => {
       abortController.abort()
     }
   }, [])
   ```

## Browser Compatibility

### Internet Explorer issues

**Problem:**
Components don't work in IE11.

**Solution:**
Shanfu UI doesn't support IE11. Minimum supported browsers:

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

For legacy browser support, consider:

1. Using polyfills
2. Transpiling with Babel
3. Using alternative libraries

### Safari-specific issues

**Problem:**
Styles appear different in Safari.

**Solutions:**

1. **Add vendor prefixes:**

   ```css
   .custom-component {
     -webkit-appearance: none;
     -webkit-transform: translateZ(0);
   }
   ```

2. **Use autoprefixer:**
   ```javascript
   // postcss.config.js
   module.exports = {
     plugins: {
       autoprefixer: {
         browsers: ['> 1%', 'last 2 versions'],
       },
     },
   }
   ```

### Mobile browser issues

**Problem:**
Touch events not working properly.

**Solutions:**

1. **Add touch action:**

   ```css
   .interactive-element {
     touch-action: manipulation;
   }
   ```

2. **Use proper viewport:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   ```

## Getting Additional Help

If you're still experiencing issues:

1. **Check the examples:** [Examples documentation](./EXAMPLES.md)
2. **Search existing issues:** [GitHub Issues](https://github.com/shan2new/shanfu-ui/issues)
3. **Create a minimal reproduction:** Use [CodeSandbox](https://codesandbox.io) or [StackBlitz](https://stackblitz.com)
4. **Join the community:** [GitHub Discussions](https://github.com/shan2new/shanfu-ui/discussions)
5. **Contact support:** [GitHub Discussions](https://github.com/shan2new/shanfu-ui/discussions)

## Reporting Bugs

When reporting bugs, please include:

1. **Environment details:**

   - Node.js version
   - Package manager (npm/yarn/pnpm)
   - Bundler (Vite/webpack/Next.js)
   - Browser and version

2. **Minimal reproduction:**

   ```tsx
   import { Button } from '@shanfu/ui'

   // Minimal code that reproduces the issue
   function BugDemo() {
     return <Button>Bug demo</Button>
   }
   ```

3. **Expected vs actual behavior**
4. **Error messages and stack traces**
5. **Screenshots or recordings (if applicable)**

---

_Still need help? Don't hesitate to reach out to our community or support team!_
