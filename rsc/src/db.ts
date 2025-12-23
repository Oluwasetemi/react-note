import Database from 'better-sqlite3'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(dirname, 'app.db')

// Create database connection
const db = new Database(dbPath)

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL')

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS counters (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    value INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)

// Initialize the server and client counters if they don't exist
const initCounters = db.prepare(`
  INSERT OR IGNORE INTO counters (id, name, value)
  VALUES (?, ?, 0)
`)
initCounters.run(1, 'server')
initCounters.run(2, 'client')

// Prepare statements for better performance
export const statements = {
  getCounter: db.prepare('SELECT value FROM counters WHERE name = ?'),
  updateCounter: db.prepare(
    'UPDATE counters SET value = value + ? WHERE name = ?',
  ),
  setCounter: db.prepare('UPDATE counters SET value = ? WHERE name = ?'),

  getUser: db.prepare('SELECT * FROM users WHERE id = ?'),
  createUser: db.prepare('INSERT INTO users (name) VALUES (?) RETURNING *'),
  getAllUsers: db.prepare('SELECT * FROM users ORDER BY created_at DESC'),
}

export default db
