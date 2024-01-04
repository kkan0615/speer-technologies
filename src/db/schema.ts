import {
  timestamp,
  pgTable,
  integer,
   serial,
  text,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').notNull().primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow(),
  deletedAt: timestamp('deletedAt', { mode: 'string' }),
})

export const notes = pgTable('notes', {
  id: serial('id').notNull().primaryKey(),
  content: text('content').notNull(),
  userId: integer('userId').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow(),
  deletedAt: timestamp('deletedAt', { mode: 'string' }),
})