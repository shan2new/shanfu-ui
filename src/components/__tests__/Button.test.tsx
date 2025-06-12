import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import { Button } from '../ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Test Button</Button>)
    expect(
      screen.getByRole('button', { name: 'Test Button' })
    ).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Test</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    button.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
