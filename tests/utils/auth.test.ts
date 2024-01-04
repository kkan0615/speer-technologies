import { genAccessToken, verifyAccessToken } from "../../src/utils/auth"

describe('Auth utils tests', () => {
  test('It should generate access token', () => {
    expect(genAccessToken({})).toBeDefined()
  })

  test('It should verify access token', () => {
    const accessToken = genAccessToken({})
    expect(verifyAccessToken(accessToken)).toBeDefined()
  })

  test('It should not verify access token', (done) => {
    try {
      verifyAccessToken('Wrong Token')
    } catch(error) {
      done()
    }
  })
})