export default function validateString(value) {
  if (typeof value !== "string") {
    throw new Error(`[Type string] Expected string but got ${typeof value}`)
  }

  if (value.length === 0) {
    throw new Error("[Type string] String cannot be empty")
  }

  if (value.length > 1000) {
    throw new Error("[Type string] String exceeds maximum length of 1000 characters")
  }

  return value.trim()
}
