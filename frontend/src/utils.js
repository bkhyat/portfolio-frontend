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