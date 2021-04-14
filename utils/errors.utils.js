module.exports.signUpErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message.includes("email")) errors.email = "Email incorrect";

    if (err.message.includes("password"))
        errors.password = "Password should be at least 4 characters";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "This email is already registered";

    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }

    if (err.message.includes("email"))
        errors.email = "Incorrect email";

    if (err.message.includes('password'))
        errors.password = "Password does not match"

    return errors;
}