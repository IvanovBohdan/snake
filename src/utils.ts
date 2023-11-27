export function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomColor() {
    const r = getRandomNumber(0, 255);
    const g = getRandomNumber(0, 255);
    const b = getRandomNumber(0, 255);

    const luminance = Math.sqrt(
        (0.299 * r) ** 2 + (0.587 * g) ** 2 + (0.114 * b) ** 2
    );

    if (luminance > 150) {
        return getRandomColor();
    }

    return `rgb(${r}, ${g}, ${b})`;
}

export function getRandomItem<T>(items: T[]) {
    return items[getRandomNumber(0, items.length - 1)];
}
