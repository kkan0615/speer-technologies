import RateLimit from 'express-rate-limit'

export const limiter = RateLimit({
	windowMs: 60 * 1000, // 1 minute
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: "You have exceeded your 5 requests per minute limit.",
})