export const isoToHhMm = (isoString: string): string => {
  const date = new Date(isoString)

  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  const hhmm = `${hours}:${minutes}`
  return hhmm
}
