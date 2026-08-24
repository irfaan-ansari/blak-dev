type RelativeTimeOptions = {
  fallbackAfterDays?: number
  fallback?: "date" | "datetime"
}

export function formatRelative(
  date: Date | string | number,
  options: RelativeTimeOptions = {}
): string {
  const { fallbackAfterDays, fallback = "date" } = options

  const time = new Date(date).getTime()

  if (Number.isNaN(time)) {
    return ""
  }

  const diff = Math.max(0, Date.now() - time)

  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (fallbackAfterDays !== undefined && days >= fallbackAfterDays) {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      ...(fallback === "datetime" && {
        timeStyle: "short",
      }),
    }).format(new Date(time))
  }

  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes} min ago`
  if (hours < 24) return `${hours} hr ago`
  if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`

  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (weeks < 5) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
  if (months < 12) return `${months} ${months === 1 ? "month" : "months"} ago`

  return `${years} ${years === 1 ? "year" : "years"} ago`
}
