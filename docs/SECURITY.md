# Security Policy

## Supported Versions

Security updates are provided for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability in Shanfu UI, please report it responsibly.

### How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please create a [private security advisory](https://github.com/shan2new/shanfu-ui/security/advisories/new) or contact the maintainers through GitHub with:

1. **Description** - Detailed description of the vulnerability
2. **Impact** - How the vulnerability can be exploited
3. **Reproduction** - Steps to reproduce the issue
4. **Environment** - Browser, Node.js version, package version
5. **Suggested Fix** - If you have ideas for fixing it

### Response Timeline

- **Initial Response**: Within 24 hours
- **Triage**: Within 72 hours  
- **Fix Development**: Within 7 days for critical issues
- **Release**: Within 14 days for critical issues

### Disclosure Policy

- We will acknowledge receipt of your vulnerability report
- We will provide a timeline for fixing the vulnerability
- We will notify you when the vulnerability is fixed
- We will credit you in the security advisory (unless you prefer to remain anonymous)

## Security Considerations

### Input Validation

All input components in Shanfu UI should be used with proper validation:

```tsx
// Good: Server-side validation + client-side validation
<EnhancedInput
  validation={[
    { rule: (v) => v.length <= 100, message: 'Too long' },
    { rule: (v) => !/[<>]/.test(v), message: 'Invalid characters' }
  ]}
/>
```

```tsx
// Bad: Client-side validation only
<input value={userInput} />
```

### XSS Prevention

Components are designed to prevent XSS attacks:

```tsx
// Safe: Content is automatically escaped
<Button>{userProvidedText}</Button>

// Potentially unsafe: Using dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userContent }} />
```

### Content Security Policy (CSP)

Shanfu UI is compatible with strict CSP policies:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               style-src 'self' 'unsafe-inline';
               script-src 'self';">
```

Note: `'unsafe-inline'` is needed for CSS-in-JS styling. Consider using nonce-based CSP for production.

### Async Data Loading

When using async components, validate data sources:

```tsx
// Good: Validate and sanitize API responses
<AsyncSelect
  fetcher={async (query) => {
    const data = await api.search(sanitize(query))
    return validate(data)
  }}
/>

// Bad: Direct API usage without validation
<AsyncSelect fetcher={api.search} />
```

## Known Security Considerations

### 1. Client-Side Validation Only

Client-side validation is for UX only and can be bypassed:

```tsx
// This is NOT sufficient for security
<EnhancedInput
  validation={[
    { rule: (v) => v.length > 0, message: 'Required' }
  ]}
/>
```

**Solution**: Always validate on the server-side as well.

### 2. Inline Editing Security

Inline editing components require careful handling:

```tsx
// Ensure proper authorization
<InlineEditText
  value={data.title}
  onSave={async (value) => {
    // Validate user permissions
    if (!user.canEdit(data.id)) {
      throw new Error('Unauthorized')
    }
    
    // Sanitize input
    const sanitized = sanitize(value)
    
    // Server-side validation
    await api.update(data.id, sanitized)
  }}
/>
```

### 3. Theme Injection

Theme customization should be restricted:

```css
/* Good: Predefined theme variables */
:root {
  --primary: 220 90% 56%;
}

/* Bad: User-controlled CSS */
/* Never allow users to inject arbitrary CSS */
```

### 4. File Upload (If Extended)

If you extend components for file upload:

```tsx
// Validate file types and sizes
const allowedTypes = ['image/jpeg', 'image/png']
const maxSize = 5 * 1024 * 1024 // 5MB

const validateFile = (file: File) => {
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type')
  }
  if (file.size > maxSize) {
    throw new Error('File too large')
  }
}
```

## Dependency Security

### Automatic Updates

We use automated tools to monitor dependencies:

- **Dependabot** - Automatic dependency updates
- **npm audit** - Vulnerability scanning
- **Snyk** - Continuous security monitoring

### Peer Dependencies

Keep peer dependencies updated:

```bash
# Check for vulnerabilities
npm audit

# Update peer dependencies
npm update @radix-ui/react-dropdown-menu
npm update lucide-react
```

### Supply Chain Security

We verify the integrity of our dependencies:

- All dependencies are from trusted sources
- We use `package-lock.json` for reproducible builds
- Regular security audits of the dependency tree

## Best Practices for Developers

### 1. Sanitize User Input

```tsx
import DOMPurify from 'dompurify'

const sanitizeHtml = (html: string) => {
  return DOMPurify.sanitize(html)
}

// Use sanitized content
<div dangerouslySetInnerHTML={{ __html: sanitizeHtml(userHtml) }} />
```

### 2. Validate API Responses

```tsx
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string(),
  name: z.string().max(100),
  email: z.string().email()
})

<AsyncSelect
  fetcher={async (query) => {
    const response = await fetch(`/api/users?q=${encodeURIComponent(query)}`)
    const data = await response.json()
    
    // Validate response structure
    return data.map(user => UserSchema.parse(user))
  }}
/>
```

### 3. Implement Rate Limiting

```tsx
import { debounce } from 'lodash'

const debouncedFetch = debounce(async (query: string) => {
  // API call
}, 300)

<AsyncSelect fetcher={debouncedFetch} />
```

### 4. Use HTTPS

Always use HTTPS in production:

```tsx
// Good
const API_BASE = 'https://api.example.com'

// Bad
const API_BASE = 'http://api.example.com'
```

### 5. Implement Proper Authentication

```tsx
<InlineEditText
  value={data.title}
  onSave={async (value) => {
    const token = await getAuthToken()
    
    const response = await fetch('/api/update', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value })
    })
    
    if (!response.ok) {
      throw new Error('Update failed')
    }
  }}
/>
```

## Browser Security

### Subresource Integrity (SRI)

If loading from CDN, use SRI:

```html
<!-- If using CDN (not recommended for npm packages) -->
<link 
  rel="stylesheet" 
  href="https://cdn.example.com/shanfu-ui@1.0.0/styles.css"
  integrity="sha384-ABC123..."
  crossorigin="anonymous"
>
```

### Cross-Origin Policies

Configure CORS properly:

```tsx
// API configuration
const apiHeaders = {
  'Access-Control-Allow-Origin': 'https://yourdomain.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}
```

## Reporting Security Issues in Dependencies

If you find security issues in our dependencies:

1. Check if we're using the latest version
2. Report to the dependency maintainer
3. Create a [GitHub Issue](https://github.com/shan2new/shanfu-ui/issues) with security label
4. We'll work on updating or finding alternatives

## Security Changelog

### Version 1.0.0
- Initial security review completed
- All dependencies audited
- CSP compatibility verified
- XSS prevention measures implemented

## Additional Resources

- [OWASP React Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [React Security Best Practices](https://react.dev/reference/react-dom/components/common#applying-client-and-server-htmlprops)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)

## Contact

For security-related questions or concerns:

- **GitHub Issues**: [Create a security issue](https://github.com/shan2new/shanfu-ui/issues)
- **Security Advisories**: [Private vulnerability reports](https://github.com/shan2new/shanfu-ui/security/advisories/new)
- **Response Time**: Within 24 hours

---

*Security is a shared responsibility. By following these guidelines and reporting vulnerabilities responsibly, you help keep Shanfu UI secure for everyone.* 