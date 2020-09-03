/**
 * Return date with "HH:MM DD.MM.YYYY" format
 */
export function getDateNow() {
  const date = new Date()

  const year = date.getFullYear()
  const month = addLeadZero(date.getMonth() + 1)
  const day = addLeadZero(date.getDate())
  const hours = addLeadZero(date.getHours())
  const mins = addLeadZero(date.getMinutes())

  return `${hours}:${mins} ${day}.${month}.${year}`
}

/**
 * Add leading zero if argument "num" less then 10
 * @param {Number} num
 */
export function addLeadZero(num) {
  return num < 10 ? `0${num}` : num
}

/**
 * @param {string} email
 */
export function validateEmail(email) {
  const regex = /\S+@\S+\.\S+/
  return regex.test(email)
}
