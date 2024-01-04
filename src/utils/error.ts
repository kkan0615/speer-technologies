import { Response } from 'express'
import { ServiceError } from '../types/server'

export const handleServiceError = (error: ServiceError, res: Response) => {
  return res.status(error.status).send(error.msg)
}