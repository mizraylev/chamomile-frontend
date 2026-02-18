import { toFormattedLastSeen } from '@/app/utils/time'
import { onUnmounted, ref, toRef, watch, type MaybeRefOrGetter } from 'vue'

/** Returns a string ref to indicate time ago.
 * @param formatter A function that wraps the Time Ago string with some text.
 * The returned string ref will contain the Time Ago string as is, if the formatter is not provided.
 * @param justNow A string to use if less than a minute has passed.
 */
export default function useTimeAgo(
  datetime: MaybeRefOrGetter<string | undefined>,
  locale?: Intl.LocalesArgument,
  formatter: (timeAgo: string) => string = (timeAgo: string) => timeAgo,
  justNow: string = 'just now',
) {
  const rtf = new Intl.RelativeTimeFormat(locale)

  const timestamp = toRef(datetime)
  const timeAgoLabel = ref('')

  let timeout: ReturnType<typeof setTimeout> | undefined
  const calcLastSeenLabel = () => {
    clearTimeout(timeout)

    if (!timestamp.value) {
      timeAgoLabel.value = ''
      return
    }

    const dt = new Date(timestamp.value)
    const now = new Date()

    const diffInMs = now.getTime() - dt.getTime()
    const diffInMins = Math.floor(diffInMs / 1000 / 60)

    if (diffInMins < 60) {
      const timeAgo = diffInMins === 0 ? justNow : rtf.format(-diffInMins, 'minute')
      timeAgoLabel.value = formatter(timeAgo)

      timeout = setTimeout(calcLastSeenLabel, 1000 * 60)
      return
    }

    const diffInHours = Math.floor(diffInMins / 60)
    if (diffInHours < 24) {
      const timeAgo = rtf.format(-diffInHours, 'hour')
      timeAgoLabel.value = formatter(timeAgo)

      timeout = setTimeout(calcLastSeenLabel, 1000 * 60 * 60)
      return
    }

    timeAgoLabel.value = toFormattedLastSeen(timestamp.value)
  }

  watch(
    timestamp,
    () => {
      calcLastSeenLabel()
    },
    { immediate: true },
  )

  onUnmounted(() => {
    clearTimeout(timeout)
  })

  return { timeAgoLabel }
}
