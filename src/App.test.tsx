import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('creates a task and moves it to another status', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.click(screen.getAllByRole('button', { name: /new task/i })[0])
    await user.type(screen.getByLabelText(/title/i), 'Ship polished board')
    await user.type(screen.getByLabelText(/description/i), 'Make it feel senior.')
    await user.click(screen.getByRole('button', { name: /save task/i }))

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))

    const todoRegion = screen.getByRole('region', { name: /to do/i })
    expect(within(todoRegion).getByText('Ship polished board')).toBeInTheDocument()

    await user.click(screen.getByLabelText(/status for ship polished board/i))
    await user.click(screen.getByRole('option', { name: /done/i }))

    const doneRegion = screen.getByRole('region', { name: /done/i })
    expect(within(doneRegion).getByText('Ship polished board')).toBeInTheDocument()
    expect(within(todoRegion).queryByText('Ship polished board')).not.toBeInTheDocument()
  })

  it('deletes a task through the confirmation dialog', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.click(screen.getAllByRole('button', { name: /new task/i })[0])
    await user.type(screen.getByLabelText(/title/i), 'Remove me')
    await user.click(screen.getByRole('button', { name: /save task/i }))

    expect(screen.getByText('Remove me')).toBeInTheDocument()

    await user.click(screen.getByLabelText(/delete remove me/i))
    await user.click(screen.getByRole('button', { name: /delete task/i }))

    expect(screen.queryByText('Remove me')).not.toBeInTheDocument()
  })
})
