function checkValidation(text) {
    //check whether min 2 numbers is provided
    if (text.length < 2) {
        return {isValid: false,message: "Please provide at least 2 numbers"};
    }
    //check whether all are numbers
    for (let i = 0; i < text.length; i++) {
        if (isNaN(text[i])) {
            return {isValid: false,message: "Please provide a valid number"};
        }
    }
    return {isValid: true};
}

export { checkValidation };