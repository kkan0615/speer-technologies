import { Router } from 'express'
import { login, register } from '../services/auth'
import { ServiceError } from '../types/server';
import { handleServiceError } from '../utils/error';

const router = Router()

router.post('/signup', async (req, res) => {
  if (!req.body.email || !req.body.password) return res.status(400).send('invalidate')
  try {
   await register({
      email: req.body.email,
      password: req.body.password,
    })

    return res.status(201).send('successfully registered')
  } catch (error: unknown) {
    if ((error as ServiceError).status) return handleServiceError(error as ServiceError, res)
    return res.status(500).send('Server error')      
  }
})

router.post('/login', async (req, res) => {
  try {
    const accessToken = await login({
      email: req.body.email,
      password: req.body.password,
    })

    return res.json({
      accessToken,
    })
  } catch (error: unknown) {
    if ((error as ServiceError).status) return handleServiceError(error as ServiceError, res)
    return res.status(500).send('Server error')      
  }
})

export default router