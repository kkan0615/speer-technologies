import db from '../db';
import { users } from '../db/schema';
import { RegisterUser } from '../types/models/user';
import { genAccessToken } from '../utils/auth';
import bcrypt from 'bcrypt';

export const register = async ({email, password}: RegisterUser) => {
  const exUserByEmail = await db.query.users.findFirst({
    where: (users, { and, eq, isNull }) => and(
      eq(users.email, email),
      isNull(users.deletedAt),
    )
  }).catch()
  if (exUserByEmail && exUserByEmail.email) throw { msg: 'Email is already existed', status: 409}
  await db.insert(users).values({
    email: email,
    password: await bcrypt.hash(password, 10),
  })
}

export const login = async ({email, password}: {email: string, password: string}) => {
  const exUserByEmail = await db.query.users.findFirst({
    where: (users, { and, eq, isNull }) => and(
      eq(users.email, email),
      isNull(users.deletedAt),
    )
  }).catch()
  if (!exUserByEmail || !exUserByEmail.password ) throw { msg: 'Invalid email or password 1', status: 400}
  const isPassPassword = await bcrypt.compare(password, exUserByEmail.password)
  if (!isPassPassword) throw { msg: 'Invalid email or password 2', status: 400}

  return genAccessToken({
    'id': exUserByEmail.id,
    'email': exUserByEmail.email,
  })
}