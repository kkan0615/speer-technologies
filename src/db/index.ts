import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { config as envConfig } from 'dotenv'

// Set .env
envConfig()

export const dbClient = postgres(process.env.DATABASE_URL as string, { max: 1 })

export const db = drizzle(dbClient, { schema })
export default db
