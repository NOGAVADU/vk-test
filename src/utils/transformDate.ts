export function getDate(value: number): string {
    const newDate = new Date(value * 1000);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const day = newDate.getDate().toString().padStart(2, "0");
    return `${day}.${month}.${year}`;
}
