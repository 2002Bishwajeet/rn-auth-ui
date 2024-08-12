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

function isValidEmail(email: string): boolean {
    // Regular expression pattern for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


export { convertToPascalCase, clamp, isValidEmail };