'use client'

import React from 'react'
import { createUser } from './action'

type User = {
  id: number
  name: string
  created_at: string
}

export function UserForm() {
  const [users, setUsers] = React.useState<User[]>([])
  const [isPending, startTransition] = React.useTransition()
  const [error, setError] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null,
  )
  const formRef = React.useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string

    if (!name || name.trim().length === 0) {
      setError('Name is required')
      return
    }

    startTransition(async () => {
      try {
        // Call server action to create user in database
        const newUser = await createUser(name.trim())

        // Optimistically update the UI
        setUsers((prev) => [newUser, ...prev])

        // Show success message
        setSuccessMessage(`User "${newUser.name}" created successfully!`)

        // Reset form
        formRef.current?.reset()

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create user')
      }
    })
  }

  return (
    <div className="user-form-container">
      <h2>Create User (Client Component → Database)</h2>

      <form ref={formRef} onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Enter user name"
            disabled={isPending}
            className="user-input"
            autoComplete="off"
          />
          <button type="submit" disabled={isPending} className="submit-btn">
            {isPending ? 'Creating...' : 'Create User'}
          </button>
        </div>

        {error && (
          <div
            className="error-message"
            style={{ color: 'red', marginTop: '0.5rem' }}
          >
            ❌ {error}
          </div>
        )}

        {successMessage && (
          <div
            className="success-message"
            style={{ color: 'green', marginTop: '0.5rem' }}
          >
            ✅ {successMessage}
          </div>
        )}
      </form>

      {users.length > 0 && (
        <div className="users-list" style={{ marginTop: '1rem' }}>
          <h3>Recently Created Users:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {users.map((user) => (
              <li
                key={user.id}
                style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}
              >
                <strong>#{user.id}</strong> {user.name}
                <span
                  style={{
                    color: '#666',
                    fontSize: '0.85rem',
                    marginLeft: '1rem',
                  }}
                >
                  {new Date(user.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
