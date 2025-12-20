export const isoToHhMm = (isoString: string): string => {
  const date = new Date(isoString)

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  const hhmm = `${hours}:${minutes}`
  return hhmm
}

export const toFormattedLastSeen = (timestamp: string): string => {
  const date = new Date(timestamp)

  const formattedTimestamp = date.toLocaleString('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return 'Last seen on ' + formattedTimestamp
}
