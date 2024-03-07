export function formatDuration(duration) {
  const minutes = Math.floor(duration / 60)
  const seconds = Math.floor(duration % 60)
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

export function formatDurationWords(duration) {
  if (duration > 3600) {
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    let final = `${hours} ${hours > 1 ? 'hrs' : 'hr'}`
    if (minutes > 0) {
      final += ` ${minutes} ${minutes > 1 ? 'mins' : 'min'}`
    }
    return final
  }

  const minutes = Math.floor(duration / 60)
  const seconds = Math.floor(duration % 60)
  let final = `${minutes} ${minutes > 1 ? 'mins' : 'min'}`
  if (seconds > 0) {
    final += ` ${seconds} ${seconds > 1 ? 'secs' : 'sec'}`
  }
  return final
}

export function formatDate(date) {
  // date format input : 2021-08-01 00:00:00.000
  // date format output : 01 Aug 2021
  const d = new Date(date)
  return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`
}
