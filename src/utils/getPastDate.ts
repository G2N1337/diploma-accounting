type PastDateOptions = {
  daysAgo?: number
  startOfDay?: boolean
  endOfDay?: boolean
}

export function getPastDate(options: PastDateOptions = {}): Date {
  const { daysAgo = 1, startOfDay, endOfDay } = options

  const date = new Date()
  date.setDate(date.getDate() - daysAgo)

  if (startOfDay) {
    date.setHours(0, 0, 0, 0)
  } else if (endOfDay) {
    date.setHours(23, 59, 59, 999)
  }

  return date
}
