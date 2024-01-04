import { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../utils/auth';

export const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '');  
  if (!accessToken) {
    return res.status(401).send('Unauthorized')
  }

  try {
    const decoded = verifyAccessToken(accessToken) as {
      id: string
      email: string
    }
    req.user = decoded
    next()
  } catch (e) {
    return res.status(401).send('Unauthorized')
  }
}