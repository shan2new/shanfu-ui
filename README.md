# @shanfu/ui

[![npm version](https://badge.fury.io/js/@shanfu%2Fui.svg)](https://www.npmjs.com/package/@shanfu/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Build Status](https://img.shields.io/badge/Build-Passing-green.svg)]()
[![Bundle Size](https://img.shields.io/badge/Bundle%20Size-8.2KB-brightgreen.svg)]()

> **Production-ready React component library** featuring inline editing, async data handling, and modern UI primitives. Built with TypeScript, Tailwind CSS, and accessibility in mind.

## Why @shanfu/ui?

**@shanfu/ui** solves real-world UI challenges that developers face daily:

- **🎯 Inline Editing Made Simple** - Click-to-edit functionality without the complexity
- **⚡ Async Data Handling** - Built-in support for async operations and loading states
- **♿ Accessibility First** - WCAG compliant with proper keyboard navigation
- **🎨 Theme Aware** - Dark/light mode with system preference detection
- **📦 Tree Shakable** - Import only what you need, optimized bundle sizes
- **🔧 TypeScript Native** - Full type safety and IntelliSense support

## Quick Start

### Installation

```bash
npm install @shanfu/ui

# Peer dependencies
npm install react react-dom lucide-react @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-slot
```

### Basic Setup

```tsx
// 1. Import styles
import '@shanfu/ui/styles.css'

// 2. Wrap your app with theme provider
import { ThemeProvider } from '@shanfu/ui'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <YourApp />
    </ThemeProvider>
  )
}
```

### Usage Examples

```tsx
import { InlineEditText, AsyncSelect, Button, ThemeToggle } from '@shanfu/ui'

function Dashboard() {
  const [title, setTitle] = useState('My Dashboard')

  return (
    <div className="p-6">
      {/* Inline editing - click to edit */}
      <InlineEditText
        value={title}
        onSave={setTitle}
        className="text-2xl font-bold"
      />

      {/* Async select with search */}
      <AsyncSelect
        fetcher={async (query) => fetchUsers(query)}
        placeholder="Search users..."
        onSelect={(user) => console.log('Selected:', user)}
      />

      {/* Theme toggle */}
      <ThemeToggle />
    </div>
  )
}
```

## Core Components

### Inline Editing Components

Perfect for dashboards, admin panels, and content management:

```tsx
// Text editing
<InlineEditText value={text} onSave={handleSave} />

// Textarea editing
<InlineEditTextarea value={content} onSave={handleSave} />

// Select dropdown editing
<InlineEditSelect
  value={status}
  options={statusOptions}
  onSave={handleStatusChange}
/>
```

### Async Components

Handle async operations with built-in loading and error states:

```tsx
// Async select with search
<AsyncSelect
  fetcher={searchUsers}
  onSelect={handleUserSelect}
/>

// Async select with creation
<AsyncCreatableSelect
  fetcher={searchTags}
  onCreateOption={createNewTag}
  onSelect={handleTagSelect}
/>
```

### Enhanced Form Controls

Improved versions of standard form elements:

```tsx
// Enhanced input with validation
<EnhancedInput
  placeholder="Email address"
  type="email"
  validation={emailValidation}
/>

// Enhanced textarea with auto-resize
<EnhancedTextarea
  placeholder="Your message"
  autoResize
  maxRows={10}
/>
```

## Tailwind CSS Integration

Add our presets to your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
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

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { InlineEditTextProps, AsyncSelectProps } from '@shanfu/ui'

// Type-safe props
const props: InlineEditTextProps = {
  value: 'Hello',
  onSave: async (newValue: string) => {
    await saveToAPI(newValue)
  },
  placeholder: 'Enter text...',
  disabled: false,
}
```

## Performance & Bundle Size

- **ESM Bundle**: 8.19KB gzipped
- **CJS Bundle**: 8.33KB gzipped
- **Tree Shakable**: Import only what you use
- **No Runtime Dependencies**: Only peer dependencies required

```tsx
// ✅ Tree-shaken imports (recommended)
import { Button, InlineEditText } from '@shanfu/ui'

// ❌ Avoid importing everything
import * as ShanfuUI from '@shanfu/ui'
```

## Accessibility Features

All components follow WCAG guidelines:

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Logical focus flow and indicators
- **Color Contrast**: Meets WCAG AA standards
- **Reduced Motion**: Respects user preferences

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile**: iOS 14+, Android 10+

## Framework Compatibility

Works seamlessly with:

- **Next.js** (App Router & Pages Router)
- **Remix**
- **Vite + React**
- **Create React App**
- **Gatsby**
- **Astro** (with React integration)

## Development

### Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

```bash
# Setup
git clone https://github.com/shan2new/shanfu-ui.git
cd shanfu-ui
npm install

# Development
npm run dev      # Start dev server
npm run build    # Build package
npm run test     # Run tests
npm run lint     # Check code quality
```

### Architecture

- **Components**: Built with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables
- **State Management**: React hooks and context
- **Build Tool**: Vite with TypeScript
- **Testing**: Vitest with React Testing Library

## Security

Report security vulnerabilities to: [security@shanfu.dev](mailto:security@shanfu.dev)

See our [Security Policy](./SECURITY.md) for more details.

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Support

- **Documentation**: [GitHub Repository](https://github.com/shan2new/shanfu-ui)
- **Issues**: [GitHub Issues](https://github.com/shan2new/shanfu-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/shan2new/shanfu-ui/discussions)

---

Built with ❤️ by [Shantanu Sinha](https://github.com/shan2new)
