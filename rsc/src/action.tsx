'use server'

import { statements } from './db'

/**
 * Get the current server counter value from SQLite database
 */
export async function getServerCounter(): Promise<number> {
  const result = statements.getCounter.get('server') as
    | { value: number }
    | undefined
  return result?.value ?? 0
}

export async function getClientCounter(): Promise<number> {
  const result = statements.getCounter.get('client') as
    | { value: number }
    | undefined
  return result?.value ?? 0
}

/**
 * Update the server counter by a specified amount
 * @param change - The amount to increment/decrement the counter
 */
export async function updateServerCounter(change: number): Promise<number> {
  statements.updateCounter.run(change, 'server')
  return getServerCounter()
}

/**
 * Update the client counter by a specified amount
 * @param change - The amount to increment/decrement the counter
 */
export async function updateClientCounter(change: number): Promise<number> {
  statements.updateCounter.run(change, 'client')
  return getClientCounter()
}

/**
 * Fetch user data by ID from the database
 * @param id - User ID to fetch
 */
export async function fetchUserData(id: number) {
  const user = statements.getUser.get(id) as
    | { id: number; name: string; created_at: string }
    | undefined

  if (!user) {
    return null
  }

  return user
}

/**
 * Create a new user in the database
 * @param name - Name of the user to create
 */
export async function createUser(name: string) {
  const user = statements.createUser.get(name) as {
    id: number
    name: string
    created_at: string
  }
  return user
}

/**
 * Get all users from the database
 */
export async function getAllUsers() {
  const users = statements.getAllUsers.all() as Array<{
    id: number
    name: string
    created_at: string
  }>
  return users
}
