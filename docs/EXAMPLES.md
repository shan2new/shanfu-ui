# Examples

Real-world usage examples for Shanfu UI components.

## 📚 Table of Contents

- [Basic Usage](#basic-usage)
- [Forms & Validation](#forms--validation)
- [Data Management](#data-management)
- [Layout & Navigation](#layout--navigation)
- [Advanced Patterns](#advanced-patterns)
- [Integration Examples](#integration-examples)

## Basic Usage

### Simple Button Examples

```tsx
import { Button } from '@shanfu/ui'

// Basic buttons
export function ButtonExamples() {
  return (
    <div className="space-x-2">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}

// Loading states
export function LoadingButtons() {
  return (
    <div className="space-x-2">
      <Button loading>Saving...</Button>
      <Button loading variant="destructive">
        Deleting...
      </Button>
    </div>
  )
}

// With icons
export function IconButtons() {
  return (
    <div className="space-x-2">
      <Button icon={<Plus />}>Add Item</Button>
      <Button icon={<Save />} iconPosition="right">
        Save
      </Button>
      <Button variant="outline" size="icon">
        <Search />
      </Button>
    </div>
  )
}
```

### Badge Examples

```tsx
import { Badge } from '@shanfu/ui'

export function BadgeExamples() {
  return (
    <div className="space-x-2">
      <Badge variant="default">New</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="secondary">Draft</Badge>
    </div>
  )
}

// Status indicators
export function StatusBadges() {
  const getStatusBadge = (status: string) => {
    const variants = {
      online: 'success',
      offline: 'destructive',
      away: 'warning',
      busy: 'secondary',
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="space-y-2">
      {['online', 'offline', 'away', 'busy'].map((status) => (
        <div key={status} className="flex items-center gap-2">
          <span>User is</span>
          {getStatusBadge(status)}
        </div>
      ))}
    </div>
  )
}
```

## Forms & Validation

### Basic Form with Enhanced Inputs

```tsx
import { EnhancedInput, EnhancedTextarea, Button } from '@shanfu/ui'
import { Mail, User, Lock } from 'lucide-react'

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
  })

  const [isValid, setIsValid] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    try {
      await api.register(formData)
      // Handle success
    } catch (error) {
      // Handle error
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <EnhancedInput
        placeholder="Full Name"
        icon={<User />}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        validation={[
          { rule: (v) => v.length > 0, message: 'Name is required' },
          {
            rule: (v) => v.length >= 2,
            message: 'Name must be at least 2 characters',
          },
        ]}
      />

      <EnhancedInput
        type="email"
        placeholder="Email Address"
        icon={<Mail />}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validation={[
          { rule: (v) => v.length > 0, message: 'Email is required' },
          {
            rule: (v) => /\S+@\S+\.\S+/.test(v),
            message: 'Invalid email format',
          },
        ]}
      />

      <EnhancedInput
        type="password"
        placeholder="Password"
        icon={<Lock />}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validation={[
          {
            rule: (v) => v.length >= 8,
            message: 'Password must be at least 8 characters',
          },
          {
            rule: (v) => /[A-Z]/.test(v),
            message: 'Must contain uppercase letter',
          },
          { rule: (v) => /[0-9]/.test(v), message: 'Must contain number' },
        ]}
      />

      <EnhancedTextarea
        placeholder="Tell us about yourself..."
        maxLength={500}
        showCharacterCount
        rows={4}
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
      />

      <Button type="submit" className="w-full" disabled={!isValid}>
        Create Account
      </Button>
    </form>
  )
}
```

### Dynamic Validation

```tsx
import { EnhancedInput } from '@shanfu/ui'

export function UsernameValidator() {
  const [username, setUsername] = useState('')
  const [isChecking, setIsChecking] = useState(false)

  const checkUsernameAvailability = async (value: string) => {
    if (value.length < 3) return false

    setIsChecking(true)
    try {
      const response = await api.checkUsername(value)
      return response.available
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <EnhancedInput
      placeholder="Choose username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      validation={[
        {
          rule: (v) => v.length >= 3,
          message: 'Username must be at least 3 characters',
        },
        {
          rule: (v) => /^[a-zA-Z0-9_]+$/.test(v),
          message: 'Only letters, numbers, and underscores',
        },
        {
          rule: checkUsernameAvailability,
          message: 'Username is not available',
        },
      ]}
      suffix={isChecking ? <Loader className="animate-spin" /> : null}
    />
  )
}
```

## Data Management

### User Search with Async Select

```tsx
import { AsyncSelect } from '@shanfu/ui'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export function UserSearch() {
  const fetchUsers = async (query: string): Promise<User[]> => {
    if (query.length < 2) return []

    const response = await fetch(
      `/api/users/search?q=${encodeURIComponent(query)}`
    )
    const data = await response.json()
    return data.users
  }

  const handleUserSelect = (user: User) => {
    console.log('Selected user:', user)
    // Handle user selection
  }

  return (
    <AsyncSelect<User>
      placeholder="Search users..."
      fetcher={fetchUsers}
      getDisplayValue={(user) => user.name}
      getOptionValue={(user) => user.id}
      onSelect={handleUserSelect}
      debounceMs={300}
      minQueryLength={2}
      renderOption={(user) => (
        <div className="flex items-center gap-2">
          {user.avatar && (
            <img src={user.avatar} alt="" className="h-8 w-8 rounded-full" />
          )}
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-muted-foreground text-sm">{user.email}</div>
          </div>
        </div>
      )}
    />
  )
}
```

### Tag Creation with Async Creatable Select

```tsx
import { AsyncCreatableSelect } from '@shanfu/ui'

interface Tag {
  id: string
  name: string
  color: string
}

export function TagSelector() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  const fetchTags = async (query: string): Promise<Tag[]> => {
    const response = await fetch(
      `/api/tags?search=${encodeURIComponent(query)}`
    )
    return response.json()
  }

  const createTag = async (name: string): Promise<Tag> => {
    const response = await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    return response.json()
  }

  return (
    <div className="space-y-2">
      <AsyncCreatableSelect<Tag>
        placeholder="Add tags..."
        fetcher={fetchTags}
        onCreateOption={createTag}
        getDisplayValue={(tag) => tag.name}
        getOptionValue={(tag) => tag.id}
        onSelect={(tag) => {
          setSelectedTags((prev) => [...prev, tag])
        }}
        createOptionLabel="Create tag"
      />

      <div className="flex flex-wrap gap-1">
        {selectedTags.map((tag) => (
          <Badge
            key={tag.id}
            variant="secondary"
            className="cursor-pointer"
            onClick={() =>
              setSelectedTags((prev) => prev.filter((t) => t.id !== tag.id))
            }
          >
            {tag.name} ×
          </Badge>
        ))}
      </div>
    </div>
  )
}
```

### Inline Editing for Data Tables

```tsx
import { InlineEditText, InlineEditSelect, Button } from '@shanfu/ui'

interface Product {
  id: string
  name: string
  category: string
  price: number
  status: 'active' | 'inactive' | 'draft'
}

export function ProductTable() {
  const [products, setProducts] = useState<Product[]>([])

  const updateProduct = async (id: string, field: string, value: any) => {
    try {
      await api.updateProduct(id, { [field]: value })
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
      )
    } catch (error) {
      // Handle error
    }
  }

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'draft', label: 'Draft' },
  ]

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              <InlineEditText
                value={product.name}
                onSave={(value) => updateProduct(product.id, 'name', value)}
                InputComponent={EnhancedInput}
              />
            </td>
            <td>
              <InlineEditText
                value={product.category}
                onSave={(value) => updateProduct(product.id, 'category', value)}
                InputComponent={EnhancedInput}
              />
            </td>
            <td>
              <InlineEditText
                value={product.price.toString()}
                onSave={(value) =>
                  updateProduct(product.id, 'price', parseFloat(value))
                }
                InputComponent={(props) => (
                  <EnhancedInput {...props} type="number" step="0.01" min="0" />
                )}
              />
            </td>
            <td>
              <InlineEditSelect
                value={product.status}
                options={statusOptions}
                onSave={(value) => updateProduct(product.id, 'status', value)}
              />
            </td>
            <td>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

## Layout & Navigation

### Application Layout

```tsx
import { ThemeProvider, Navigation, Layout, ThemeToggle } from '@shanfu/ui'

export function App() {
  const navigationLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/products', label: 'Products' },
    { href: '/users', label: 'Users' },
    { href: '/settings', label: 'Settings' },
  ]

  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <div className="bg-background min-h-screen">
        <Navigation title="My App" links={navigationLinks} showThemeToggle />

        <Layout sidebar={<Sidebar />}>
          <main className="container mx-auto py-6">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </Layout>
      </div>
    </ThemeProvider>
  )
}

function Sidebar() {
  return (
    <div className="w-64 space-y-2 p-4">
      <h3 className="font-semibold">Quick Actions</h3>
      <Button variant="outline" className="w-full justify-start">
        <Plus className="mr-2 h-4 w-4" />
        Add Product
      </Button>
      <Button variant="outline" className="w-full justify-start">
        <Users className="mr-2 h-4 w-4" />
        Invite User
      </Button>
    </div>
  )
}
```

### Responsive Navigation

```tsx
import { Navigation, Button, DropdownMenu } from '@shanfu/ui'

export function ResponsiveNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <Navigation
      title="Shanfu UI"
      links={[
        { href: '/docs', label: 'Documentation' },
        { href: '/examples', label: 'Examples' },
        { href: '/blog', label: 'Blog' },
      ]}
      renderMobileMenu={() => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Documentation</DropdownMenuItem>
            <DropdownMenuItem>Examples</DropdownMenuItem>
            <DropdownMenuItem>Blog</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ThemeToggle />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    />
  )
}
```

## Advanced Patterns

### Multi-Step Form

```tsx
import { Button, EnhancedInput, Badge } from '@shanfu/ui'

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    personal: {},
    company: {},
    preferences: {},
  })

  const steps = [
    { title: 'Personal Info', component: PersonalInfoStep },
    { title: 'Company Details', component: CompanyStep },
    { title: 'Preferences', component: PreferencesStep },
  ]

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress indicator */}
      <div className="mb-8 flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <Badge
              variant={index <= currentStep ? 'default' : 'secondary'}
              className="flex h-8 w-8 items-center justify-center rounded-full"
            >
              {index + 1}
            </Badge>
            <span className="ml-2 text-sm font-medium">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Current step content */}
      <div className="mb-8">
        {React.createElement(steps[currentStep].component, {
          data: formData,
          onChange: setFormData,
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>

        <Button
          onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
        >
          {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
```

### Real-time Search and Filters

```tsx
import { EnhancedInput, AsyncSelect, Badge } from '@shanfu/ui'

export function ProductSearch() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({
    category: null,
    priceRange: null,
    tags: [],
  })
  const [results, setResults] = useState([])

  const searchProducts = useMemo(
    () =>
      debounce(async (searchQuery: string, searchFilters: any) => {
        const response = await api.searchProducts({
          query: searchQuery,
          ...searchFilters,
        })
        setResults(response.products)
      }, 300),
    []
  )

  useEffect(() => {
    searchProducts(query, filters)
  }, [query, filters, searchProducts])

  return (
    <div className="space-y-4">
      {/* Search input */}
      <EnhancedInput
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        icon={<Search />}
      />

      {/* Filters */}
      <div className="flex gap-4">
        <AsyncSelect
          placeholder="Category"
          fetcher={fetchCategories}
          getDisplayValue={(cat) => cat.name}
          getOptionValue={(cat) => cat.id}
          onSelect={(category) => setFilters((prev) => ({ ...prev, category }))}
        />

        <AsyncCreatableSelect
          placeholder="Tags"
          fetcher={fetchTags}
          onCreateOption={createTag}
          getDisplayValue={(tag) => tag.name}
          getOptionValue={(tag) => tag.id}
          onSelect={(tag) =>
            setFilters((prev) => ({
              ...prev,
              tags: [...prev.tags, tag],
            }))
          }
        />
      </div>

      {/* Active filters */}
      <div className="flex flex-wrap gap-2">
        {filters.category && (
          <Badge variant="secondary" className="cursor-pointer">
            {filters.category.name} ×
          </Badge>
        )}
        {filters.tags.map((tag) => (
          <Badge key={tag.id} variant="secondary" className="cursor-pointer">
            {tag.name} ×
          </Badge>
        ))}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
```

## Integration Examples

### With React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form'
import { EnhancedInput, AsyncSelect, Button } from '@shanfu/ui'

export function HookFormExample() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email',
          },
        }}
        render={({ field }) => (
          <EnhancedInput
            {...field}
            type="email"
            placeholder="Email"
            validation={[
              {
                rule: (v) => !errors.email,
                message: errors.email?.message || '',
              },
            ]}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        rules={{ required: 'Category is required' }}
        render={({ field: { onChange, value } }) => (
          <AsyncSelect
            placeholder="Select category"
            fetcher={fetchCategories}
            getDisplayValue={(cat) => cat.name}
            getOptionValue={(cat) => cat.id}
            onSelect={(category) => onChange(category.id)}
            value={value}
          />
        )}
      />

      <Button type="submit">Submit</Button>
    </form>
  )
}
```

### With Formik

```tsx
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { EnhancedInput, Button } from '@shanfu/ui'

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
})

export function FormikExample() {
  return (
    <Formik
      initialValues={{ name: '', email: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <Field name="name">
            {({ field }: any) => (
              <EnhancedInput
                {...field}
                placeholder="Name"
                validation={[
                  {
                    rule: () => !(errors.name && touched.name),
                    message: errors.name || '',
                  },
                ]}
              />
            )}
          </Field>

          <Field name="email">
            {({ field }: any) => (
              <EnhancedInput
                {...field}
                type="email"
                placeholder="Email"
                validation={[
                  {
                    rule: () => !(errors.email && touched.email),
                    message: errors.email || '',
                  },
                ]}
              />
            )}
          </Field>

          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}
```

### With Next.js

```tsx
// pages/_app.tsx
import { ThemeProvider } from '@shanfu/ui'
import '@shanfu/ui/styles.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="nextjs-theme">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// pages/index.tsx
import { Navigation, Button } from '@shanfu/ui'
import { GetServerSideProps } from 'next'

export default function HomePage({ data }: { data: any }) {
  return (
    <div>
      <Navigation
        title="My Next.js App"
        links={[
          { href: '/', label: 'Home' },
          { href: '/about', label: 'About' },
          { href: '/contact', label: 'Contact' },
        ]}
      />

      <main className="container mx-auto py-8">
        <h1 className="mb-4 text-4xl font-bold">Welcome</h1>
        <Button>Get Started</Button>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      data: {},
    },
  }
}
```

---

_For more examples, check out our [Storybook documentation](https://shanfu.dev/storybook) or the [live examples](https://shanfu.dev/examples)._
