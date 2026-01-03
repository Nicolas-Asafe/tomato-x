export default function validateInt(value) {
  const parsed = parseInt(value, 10)

  if (isNaN(parsed)) {
    throw new Error(`[Type int] Expected integer but got "${value}"`)
  }

  if (!Number.isInteger(parsed)) {
    throw new Error(`[Type int] "${value}" is not a valid integer`)
  }

  if (parsed < -2147483648 || parsed > 2147483647) {
    throw new Error("[Type int] Integer exceeds 32-bit signed integer range")
  }

  return parsed
}
