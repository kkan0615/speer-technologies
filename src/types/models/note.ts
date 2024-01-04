import { notes } from "../../db/schema";

export type InsertNote = typeof notes.$inferInsert
export type UpdateNote = Omit<typeof notes.$inferInsert, 'id' | 'userId'>

export type GetNotes = {
  userId: number
  q?: string
}