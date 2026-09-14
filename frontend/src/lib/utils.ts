export function testPassword(password: string) {
    const hasAlpha = /[A-Z]/.test(password);
    const hasNumber = /[\d]/.test(password);
    const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);
    const passwordStrength = [hasAlpha, hasNumber, hasSpecialCharacter].filter(
        Boolean,
    ).length;

    if (password.length === 0) return "none";
    if (password.length > 10 && passwordStrength > 2) return "strong";
    if (password.length > 8 && passwordStrength > 1) return "medium";
    return "weak";
}

export function testPasswordInfo(password: string) {
    const eightCharacters = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);

    return {
        eightCharacters,
        hasNumber,
        hasSpecialCharacter,
    };
}

export function passwordCriteria({ password }: { password: string }) {
    const passwordTests = [
        {
            id: 1,
            string: "Has 8 characters",
            condition: testPasswordInfo(password).eightCharacters,
        },
        {
            id: 2,
            string: "Has a number",
            condition: testPasswordInfo(password).hasNumber,
        },
        {
            id: 3,
            string: "Has a special character",
            condition: testPasswordInfo(password).hasSpecialCharacter,
        },
    ];
    return passwordTests;
}