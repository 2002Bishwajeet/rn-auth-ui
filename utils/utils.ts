function convertToPascalCase(str: string): string {
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join("");
}

function clamp(val: number, min: number, max: number) {
    "worklet";
    return Math.min(Math.max(val, min), max);
}

export { convertToPascalCase, clamp };