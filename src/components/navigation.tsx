import * as React from 'react'
import {
  Github,
  ExternalLink,
  FileText,
  Package,
  BookOpen,
  Menu,
  X,
} from 'lucide-react'

import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ThemeToggle } from './theme-toggle'

export interface NavigationProps {
  title?: string
  version?: string
  githubUrl?: string
  docsUrl?: string
  className?: string
}

export function Navigation({
  title = 'Inline Edit UI',
  version = 'v1.0.0',
  githubUrl = 'https://github.com',
  docsUrl = 'https://docs.example.com',
  className = '',
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header
      className={`border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur ${className}`}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center px-4">
        {/* Logo and Title */}
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Package className="h-6 w-6" />
            <span className="font-bold sm:inline-block">{title}</span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <a
            className="hover:text-foreground/80 text-foreground/60 font-medium transition-colors"
            href="/docs"
          >
            Documentation
          </a>
          <a
            className="hover:text-foreground/80 text-foreground/60 font-medium transition-colors"
            href="/components"
          >
            Components
          </a>
          <a
            className="hover:text-foreground/80 text-foreground/60 font-medium transition-colors"
            href="/examples"
          >
            Examples
          </a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-1">
            {/* Version Badge */}
            <div className="hidden sm:flex">
              <Badge variant="secondary">{version}</Badge>
            </div>

            {/* GitHub Link */}
            <Button variant="ghost" size="icon" asChild>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>

            {/* Docs Link */}
            <Button variant="ghost" size="icon" asChild>
              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Documentation"
              >
                <FileText className="h-4 w-4" />
                <span className="sr-only">Documentation</span>
              </a>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-background/95 border-t backdrop-blur md:hidden">
          <nav className="container space-y-3 px-4 py-4">
            <a
              className="hover:text-foreground/80 text-foreground/60 block font-medium transition-colors"
              href="/docs"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentation
            </a>
            <a
              className="hover:text-foreground/80 text-foreground/60 block font-medium transition-colors"
              href="/components"
              onClick={() => setMobileMenuOpen(false)}
            >
              Components
            </a>
            <a
              className="hover:text-foreground/80 text-foreground/60 block font-medium transition-colors"
              href="/examples"
              onClick={() => setMobileMenuOpen(false)}
            >
              Examples
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export interface SidebarNavigationProps {
  className?: string
}

export function SidebarNavigation({ className = '' }: SidebarNavigationProps) {
  const navigationItems = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', href: '/docs' },
        { title: 'Installation', href: '/docs/installation' },
        { title: 'Quick Start', href: '/docs/quick-start' },
      ],
    },
    {
      title: 'Components',
      items: [
        { title: 'Inline Text', href: '/components/inline-text' },
        { title: 'Inline Textarea', href: '/components/inline-textarea' },
        { title: 'Inline Select', href: '/components/inline-select' },
        { title: 'Async Select', href: '/components/async-select' },
        { title: 'Enhanced Input', href: '/components/enhanced-input' },
      ],
    },
    {
      title: 'Examples',
      items: [
        { title: 'Basic Usage', href: '/examples/basic' },
        { title: 'Advanced Forms', href: '/examples/advanced' },
        { title: 'API Integration', href: '/examples/api' },
      ],
    },
  ]

  return (
    <div className={`pb-4 ${className}`}>
      <div className="space-y-4">
        {navigationItems.map((section) => (
          <div key={section.title}>
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              {section.title}
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {section.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group hover:bg-muted hover:text-foreground flex w-full items-center rounded-md border border-transparent px-2 py-1"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
