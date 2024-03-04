export function formatDuration(duration) {
  const minutes = Math.floor(duration / 60)
  const seconds = Math.floor(duration % 60)
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

export function formatDate(date) {
  // date format input : 2021-08-01 00:00:00.000
  // date format output : 01 Aug 2021
  const d = new Date(date)
  return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`
}
