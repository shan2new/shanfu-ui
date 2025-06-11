# Contributing to @shanfu/ui

Thank you for your interest in contributing to @shanfu/ui! This guide will help you get started with contributing to this open source UI component library.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+
- Git

### Setting up the development environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/shanfu-ui.git
   cd shanfu-ui
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Run tests** to ensure everything is working:
   ```bash
   npm test
   ```

## 🛠️ Development Workflow

### Branch Strategy

- `main` - Production branch, always stable
- `develop` - Development branch for new features
- Feature branches: `feature/component-name` or `feature/description`
- Bug fixes: `fix/issue-description`

### Making Changes

1. **Create a new branch** from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   ```bash
   npm run test
   npm run lint
   npm run typecheck
   npm run build
   ```

4. **Commit your changes** using conventional commits:
   ```bash
   git add .
   git commit -m "feat: add new inline select component"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## 📝 Coding Standards

### Code Style

- **TypeScript**: All code must be written in TypeScript
- **ESLint**: Follow our ESLint configuration
- **Prettier**: Code is automatically formatted with Prettier
- **Naming**: Use descriptive names for components, props, and functions

### Component Guidelines

1. **File Structure**:
   ```
   src/components/component-name/
   ├── ComponentName.tsx
   ├── ComponentName.test.tsx
   ├── index.ts
   └── README.md (optional)
   ```

2. **Component Template**:
   ```tsx
   import React from "react";
   import { cn } from "@/lib/utils";
   
   export interface ComponentNameProps {
     // Props with JSDoc comments
     className?: string;
   }
   
   export const ComponentName = React.forwardRef<
     HTMLDivElement,
     ComponentNameProps
   >(({ className, ...props }, ref) => {
     return (
       <div
         ref={ref}
         className={cn("base-classes", className)}
         {...props}
       />
     );
   });
   
   ComponentName.displayName = "ComponentName";
   ```

3. **Export from main index**:
   ```typescript
   // Add to src/index.ts
   export { ComponentName } from "./components/component-name/ComponentName";
   export type { ComponentNameProps } from "./components/component-name/ComponentName";
   ```

### Testing Requirements

- **Unit Tests**: All components must have unit tests
- **Type Tests**: Ensure TypeScript types are correct
- **Accessibility Tests**: Test keyboard navigation and screen readers
- **Visual Regression**: Test component appearance (if applicable)

Example test:
```tsx
import { render, screen } from "@testing-library/react";
import { ComponentName } from "./ComponentName";

describe("ComponentName", () => {
  it("renders correctly", () => {
    render(<ComponentName>Test content</ComponentName>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });
});
```

## 🎨 Design System Guidelines

### Styling

- **Tailwind CSS**: Use Tailwind utility classes
- **CSS Variables**: Use design tokens from our theme
- **Dark Mode**: Ensure components work in both light and dark themes
- **Responsive**: Make components responsive by default

### Accessibility

- **ARIA**: Include proper ARIA attributes
- **Keyboard Navigation**: Support keyboard navigation
- **Focus Management**: Proper focus indicators and management
- **Color Contrast**: Ensure WCAG compliance

## 📚 Documentation

### Component Documentation

Each component should include:

1. **JSDoc comments** for all props
2. **Usage examples** in the component README
3. **Accessibility notes** if relevant
4. **Migration guides** for breaking changes

### Commit Messages

We use [Conventional Commits](https://conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add AsyncCreatableSelect component
fix: resolve focus issue in InlineEditText
docs: update README with new installation steps
```

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Environment details** (OS, Node version, browser)
- **Code example** that demonstrates the issue

### Feature Requests

For feature requests, please include:

- **Use case** description
- **Proposed API** (if applicable)
- **Examples** of similar implementations
- **Breaking change** assessment

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.1): Bug fixes
- **Minor** (1.1.0): New features (backward compatible)
- **Major** (2.0.0): Breaking changes

### Changelog

All changes are documented in `CHANGELOG.md` using [changesets](https://github.com/changesets/changesets):

```bash
# Create a changeset
npm run changeset
```

## 💡 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and community discussion
- **Discord/Slack**: [Link if available]

## 🙏 Recognition

Contributors are recognized in:

- `package.json` contributors field
- GitHub contributors page
- Release notes for significant contributions

## 📄 License

By contributing to @shanfu/ui, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to @shanfu/ui! 🎉 