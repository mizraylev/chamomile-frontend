export function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number,
) {
  let timerId: ReturnType<typeof setTimeout> | undefined

  return (...args: Args) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => func(...args), delay)
  }
}
