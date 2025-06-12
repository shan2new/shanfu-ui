import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider } from './components/theme-provider'
import { Layout } from './components/layout'
import { InlineText } from './components/inline-text/InlineText'
import './styles.css'

// Dummy Input component for demo purposes
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

function App() {
  const [value, setValue] = React.useState('Click to edit me')

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <Layout
        title="Inline Edit UI"
        version="v1.0.0"
        githubUrl="https://github.com/your-username/inline-edit-ui"
        docsUrl="https://docs.example.com"
      >
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Inline Edit UI
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Professional inline editing components built with React,
              TypeScript, and Tailwind CSS.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Demo</h2>
            <div className="rounded-lg border p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Inline Text:</label>
                  <div className="mt-1">
                    <InlineText
                      value={value}
                      onSave={setValue}
                      InputComponent={Input}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Features</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">🎨 Modern Design</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Built with shadcn/ui components and design system
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">🌙 Dark Mode</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Full dark mode support with theme toggle
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">📱 Responsive</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Mobile-first responsive design
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
