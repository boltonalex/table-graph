export function reFormatDate(a: any): string {
    const aString = String(a);
    const year = aString.substring(0,4);
    const month = aString.substring(4,6) !=='00' ? aString.substring(4,6) : '01';
    const day = aString.substring(6,8) !== '00' ? aString.substring(6,8) : '01';
    return `${day}/${month}/${year}`;
}