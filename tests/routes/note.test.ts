import request from 'supertest'
import app from '../../app'
import { login, register } from '../../src/services/auth'
import { notes, users } from '../../src/db/schema'
import db from '../../src/db'
import { eq } from 'drizzle-orm'
import { genAccessToken } from '../../src/utils/auth';

describe('Notes Route test', () => {
  let accessToken = ''
  let testId = 0
  let shareId = 0

  beforeAll(async () => {
    try {
      await register({
        email: 'test2@test.com',
        password: '123',
      })
      await register({
        email: 'test3@test.com',
        password: '123',
      })
      accessToken = await login({
        email: 'test2@test.com',
        password: '123',
      })
    } catch (error) {
      console.error(error);
      
    }
  })

  test('It should get list', async () => {
    const res = await request(app)
      .get('/api/notes')
      .set('Authorization', accessToken)
      
      expect(res.statusCode).toBe(200)
  })

  test('It should create a data', async () => {
    const res = await request(app)
      .post(`/api/notes`)
      .set('Authorization', accessToken)
      .send({
        content: 'test'
      })
      
      testId = res.body[0].insertedId
      expect(res.statusCode).toBe(201)
  })

  test('It should get the data by id', async () => {
    const res = await request(app)
      .get(`/api/notes/${testId}`)
      .set('Authorization', accessToken)
      
      expect(res.statusCode).toBe(200)
      expect(res.body.content).toBe('test')
  })

  test('It should update the data by id', async () => {
    const res = await request(app)
      .put(`/api/notes/${testId}`)
      .set('Authorization', accessToken)
      .send({
        content: 'updated test'
      })
      expect(res.statusCode).toBe(201)
  })

  test('It should get the data by id', async () => {
    const res = await request(app)
      .get(`/api/notes/${testId}`)
      .set('Authorization', accessToken)
      
      expect(res.statusCode).toBe(200)
      expect(res.body.content).toBe('updated test')
  })

  test('It should share the data by id', async () => {
    const exUserByEmail = await db.query.users.findFirst({
      columns: {
        id: true,
        email: true,
      },
      where: (users, { and, eq, isNull }) => and(
        eq(users.email, 'test3@test.com'),
        isNull(users.deletedAt),
      )
    }).catch()
    const res = await request(app)
    .post(`/api/notes/${testId}/share`)
    .set('Authorization', accessToken)
    .send({
      userId: exUserByEmail?.id
    })
      
    shareId = res.body[0].insertedId
    expect(res.statusCode).toBe(201)
  })


  test('It should delete the data by id', async () => {
    const res = await request(app)
      .delete(`/api/notes/${testId}`)
      .set('Authorization', accessToken)
      expect(res.statusCode).toBe(201)
  })

  test('It should not get the data by id', async () => {
    const res = await request(app)
      .get(`/api/notes/${testId}`)
      .set('Authorization', accessToken)
      
      expect(res.statusCode).toBe(404)
  })

  afterAll(async () => {
    await db.delete(users).where(eq(users.email, 'test2@test.com'))
    await db.delete(users).where(eq(users.email, 'test3@test.com'))
    await db.delete(notes).where(eq(notes.id, shareId))
  })
})