export const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
        const remainingMinutes = minutes - hours * 60
        if (remainingMinutes === 0) {
            return `${hours}H`
        }
        return `${hours}H ${remainingMinutes}M`
    }
    return `${minutes}M`
}

export const getContryCodeFromURL = (url) => {
    return url.split('/').pop().split('.')[0].split('-').pop()
}
export const getFlagEmojiByContryCode = (contryCode) => {
  const codePoints = contryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}