/**
 * @param {string} email
 */
export function validateEmail(email) {
  const regex = /\S+@\S+\.\S+/
  return regex.test(email)
}
