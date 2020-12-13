export function convertDate(a: string): number {
    const rowParts = a.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    return Number([rowParts![3], rowParts![2], rowParts![1]].join(''));
}