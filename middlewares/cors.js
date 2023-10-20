import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:63342'
]

export function corsMiddleware ({ acceptedOrigin = ACCEPTED_ORIGINS } = {}) {
  return cors({
    origin: (origin, callback) => {
      return acceptedOrigin.includes(origin) || !origin
        ? callback(null, origin ?? true)
        : callback(null, false)
    }
  })
}
