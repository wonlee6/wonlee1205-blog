import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key')
const JWT_ISSUER = 'wonlee1205-blog'
const JWT_AUDIENCE = 'wonlee1205-blog-users'

interface TokenPayload {
  type: string
  [key: string]: any
}

export async function generateToken(payload: TokenPayload): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime('24h')
    .sign(JWT_SECRET)

  return token
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE
    })
    return !!payload
  } catch {
    return false
  }
}
