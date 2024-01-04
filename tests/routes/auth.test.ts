import request from 'supertest'
import app from '../../app'
import db from '../../src/db'
import { users } from '../../src/db/schema'
import { eq } from 'drizzle-orm'

const testData = {
  email: 'test@test.com',
  password: '123',
}

describe('Auth Route test', () => {  
  test('It should register account', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(testData)
    expect(res.statusCode).toBe(201)
  })

  test('It should fail to register account', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(testData)
    expect(res.statusCode).toBe(409)
  })

  test('It should be logged in', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(testData)
      expect(res.statusCode).toBe(200)
  })

  test('It should fail to login (Wrong password)', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testData.email,
        password: 'wrong password'
      })
      expect(res.statusCode).toBe(400)
  })

  afterAll(async () => {
    await db.delete(users).where(eq(users.email, testData.email))
  })
})