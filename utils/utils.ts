function convertToPascalCase(str: string): string {
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join("");
}

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isValidEmail(email: string): boolean {
    // Regular expression pattern for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


export { convertToPascalCase, isValidEmail, timeout };