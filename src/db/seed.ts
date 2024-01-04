// import bcrypt from 'bcrypt'
// import { v4 } from 'uuid'
// import { users } from './schema'
// import { UserCreate } from '@/types/models/user'
// import { loadEnvConfig } from '@next/env'
// import { cwd } from 'process'
// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'
// import * as schema from './schema'

// loadEnvConfig(cwd())

// const userSeeds: UserCreate[] = [
//   {
//     id: v4(),
//     email: 'admin@admin.com',
//     name: 'Admin',
//     password: '123',
//     emailVerified: new Date(),
//     type: 'ADMIN',
//   },
// ]

// const main = async () => {
//   // Setup database connection pool
//   const client = postgres((process.env as any).DATABASE_URL)
//   const db = drizzle(client, { schema })
//   // hash all password
//   const hashedUserSeeds = await Promise.all(userSeeds.map(async userSeedEl => ({
//     ...userSeedEl,
//     password: await bcrypt.hash(userSeedEl?.password || '123', 10)
//   })))
//   // insertt
//   await db.insert(users).values(hashedUserSeeds)

//   console.log('Done')
//   process.exit(0)
// }

// main()