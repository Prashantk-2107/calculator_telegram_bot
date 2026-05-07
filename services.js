function checkValidation(text) {
    if (!text || text.length < 2) {
        return { isValid: false, message: "❌ Please provide at least 2 numbers (e.g., '10 20')" };
    }
    for (let i = 0; i < text.length; i++) {
        if (isNaN(text[i]) || text[i].trim() === "") {
            return { isValid: false, message: "❌ Please provide valid numbers only." };
        }
    }
    return { isValid: true };
}

function calculateResult(operation, numbers) {
    const nums = numbers.map(Number);
    let result;

    switch (operation) {
        case "add":
            result = nums.reduce((a, b) => a + b);
            break;
        case "sub":
            result = nums.reduce((a, b) => a - b);
            break;
        case "mul":
            result = nums.reduce((a, b) => a * b);
            break;
        case "div":
            if (nums.slice(1).includes(0)) return { error: "Division by zero is not allowed!" };
            result = nums.reduce((a, b) => a / b);
            break;
        default:
            return { error: "Invalid operation" };
    }

    return { result };
}

export { checkValidation, calculateResult };