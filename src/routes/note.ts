import { Router } from 'express'
import { requireLogin } from '../middlewares/auth'
import { createNote, deleteNoteById, getNotes, getNotesById, shareNoteById, updateNoteById } from '../services/note'
import { handleServiceError } from '../utils/error'
import { ServiceError } from '../types/server'

const router = Router()

router.get('', requireLogin, async (req, res) => {
  const list = await getNotes({
    userId: req.user.id,
  })
  return res.json(list)
})

router.get('/:id', requireLogin, async (req, res) => {
  try {
    const data = await getNotesById(Number(req.params.id))
    return res.json(data)
  } catch (error) {
    if ((error as ServiceError).status) return handleServiceError(error as ServiceError, res)
    return res.status(500).send('Server error')  
  }
})

router.post('', requireLogin, async (req, res) => {
  try {
    const data = await createNote({
      userId: req.user.id,
      content: req.body.content,
    })
    return res.status(201).json(data)
  } catch (error) {
    console.error(error);
    
    if ((error as ServiceError).status) return handleServiceError(error as ServiceError, res)
    return res.status(500).send('Server error')  
  }
})

router.put('/:id', async (req, res) => {
  try {
    const data = await updateNoteById(Number(req.params.id), {
      content: req.body.content
    })
    return res.status(201).json(data)
  } catch (error) {
    if ((error as ServiceError).status) return handleServiceError(error as ServiceError, res)
    return res.status(500).send('Server error')  
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const data = await deleteNoteById(Number(req.params.id))
    return res.status(201).json(data)
  } catch (error) {
    if ((error as ServiceError).status) return handleServiceError(error as ServiceError, res)
    return res.status(500).send('Server error')
  }
})

router.post('/:id/share', requireLogin, async (req, res) => {
  try {
    const data = await shareNoteById(Number(req.params.id), req.body.userId)
    return res.status(201).json(data)
  } catch (error) {
    if ((error as ServiceError).status) return handleServiceError(error as ServiceError, res)
    return res.status(500).send('Server error')  
  }
})

export default router