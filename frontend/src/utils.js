export const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60)

    if (hours > 0) return `${hours}H ${(minutes - hours * 60)}M`
    return `${minutes}M`
}