export function convertToK(num: number) {
    if (num > 1000000000) {
        const intPart = Math.floor(num / 1000000000);
        const decPart = Math.floor((num % 1000000000) / 100000000);
        if (decPart > 0) {
            return `${intPart},${decPart}B`;
        }
        return `${intPart}B`;
    } else if (num > 1000000) {
        const intPart = Math.floor(num / 1000000);
        const decPart = Math.floor((num % 1000000) / 100000);
        if (decPart > 0) {
            return `${intPart},${decPart}M`;
        }
        return `${intPart}M`;
    } else if (num > 1000) {
        const intPart = Math.floor(num / 1000);
        const decPart = Math.floor((num % 1000) / 100);
        if (decPart > 0) {
            return `${intPart},${decPart}K`;
        }
        return `${intPart}K`;
    } else {
        return `${num}`;
    }
}
