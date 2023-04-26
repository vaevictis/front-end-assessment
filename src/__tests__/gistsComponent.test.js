import React from 'react'
import { render, screen } from '@testing-library/react'
import GistsComponent from '../components/gistsComponent'

test('displays an informative message on app load', () => {
  render(<GistsComponent />)

  expect(screen.getByText(/Search a Github username/i)).toBeInTheDocument()
})
