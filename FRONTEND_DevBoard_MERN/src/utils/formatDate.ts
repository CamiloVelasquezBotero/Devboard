export function formatDate(isoString:string) : string {
    const date = new Date(isoString)
    const formater = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formater.format(date)
}