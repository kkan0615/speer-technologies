import express, { Express } from 'express';
import { config as envConfig } from 'dotenv'
import authRouter from './src/routes/auth'
import noteRouter from './src/routes/note'
import { limiter } from './src/middlewares/rateLimiter';
import { getNotes } from './src/services/note';
import { requireLogin } from './src/middlewares/auth';

// Set .env
envConfig()

const app: Express = express()

app.use(express.json())
app.use(limiter) // Rate limit

app.get('/', (req, res) => {
  res.json(`Hello World ${new Date().toISOString()}`)
});

app.use('/api/auth', authRouter)
app.use('/api/notes', noteRouter)
// Search API
app.get('/api/search', requireLogin, async (req, res) => {
  const query = req.query as Record<string, string>
  const list = await getNotes({
    userId: req.user.id,
    q: query.q,
  })

  return res.json(list)
})

export default app