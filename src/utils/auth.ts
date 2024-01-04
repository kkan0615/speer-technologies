import jwt from 'jsonwebtoken'

const SecretKey = 'SuPeRsEcRetKeY'

export const genAccessToken = (data: Record<string, string | number>) => {
 return jwt.sign(data, SecretKey, { expiresIn: 60 * 60 })
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, SecretKey);
}