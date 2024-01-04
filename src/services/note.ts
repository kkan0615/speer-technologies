import { eq } from 'drizzle-orm';
import db from '../db';
import { notes } from '../db/schema';
import { InsertNote, UpdateNote, GetNotes } from '../types/models/note';

export const getNotes = async ({userId, q}: GetNotes) => {
  return await db.query.notes.findMany({
    where: (notes, { and, eq, like, isNull }) => and(
      q ? like(notes.content, `%${q}%`) : undefined,
      eq(notes.userId, userId),
      isNull(notes.deletedAt),
    )
  })
}

export const getNotesById = async (id: number) => {
  const noteById = await db.query.notes.findFirst({
    where: (notes, { and, eq, isNull }) => and(
      eq(notes.id, id),
      isNull(notes.deletedAt),
    )
  }).catch()
  if (!noteById || !noteById.id) {
    throw { msg: 'Not Found: Note', status: 404}
  }

  return noteById
}

export const createNote = async ({userId, content}: InsertNote) => {
  console.log(userId);
  
  return await db.insert(notes).values({
    userId,
    content,
  }).returning({
    insertedId: notes.id
  })
}

export const updateNoteById = async (id: number, { content }: UpdateNote) => {
  // Check note is existed
  const foundNoteById = await getNotesById(id)  
  console.log('foundNoteById', foundNoteById);

  return await db.update(notes).set({
    content,
  })
    .where(eq(notes.id, id))
    .returning({
      updatedId: notes.id
    })
}

export const deleteNoteById = async (id: number) => {
  return await db.delete(notes)
    .where(eq(notes.id, id))
    .returning({
      deletedId: notes.id
    })
}

export const shareNoteById = async (id: number, userId: number) => {
  const foundNoteById = await getNotesById(id)  
  return await createNote({
    userId: userId,
    content: foundNoteById.content,
  })
}