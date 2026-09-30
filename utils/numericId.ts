// Route params are always strings ("/news/abc" → "abc"), so every ID-holding
// param must be converted before it touches an API call or a typed prop.
//
// Strict on purpose: parseInt-style coercion would let "5abc" through as 5.
// Anything that isn't a clean positive integer returns null, and the caller
// rejects the request locally (404) without hitting the API at all.
export const toNumericId = (value: unknown): number | null => {
  if (typeof value === 'string' && !/^\d+$/.test(value.trim())) return null
  const n = Number(value)
  return Number.isInteger(n) && n > 0 ? n : null
}
