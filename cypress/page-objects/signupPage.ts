class SignupPage {
    public firstNameErrorText = "First Name is required";
    public lastNameErrorText = "Last Name is required";
    public usernameErrorText = "Username is required";
    public emptyPasswordErrorText = "Enter your password";
    public emptyConfirmPasswordErrorText = "Confirm your password";
    public shortPasswordErrorText = "Password must contain at least 4 characters";
    public passwordMismatchErrorText = "Password does not match";

    navigate() {
        cy.visit("/signup");
    }

    getSignInLink(){
        return cy.contains("Have an account? Sign In");
    }

    getFirstNameError() {
        return cy.get("#firstName-helper-text")
    }

    getLastNameError() {
        return cy.get("#lastName-helper-text")
    }

    getUsernameError() {
        return cy.get("#username-helper-text")
    }

    getPasswordError() {
        return cy.get("#password-helper-text")
    }

    getConfirmPasswordError() {
        return cy.get("#confirmPassword-helper-text")
    }

    getFirstNameField() {
        return cy.get("#firstName");
    }

    getLastNameField() {
        return cy.get("#lastName")
    }

    getUsernameField() {
        return cy.get("#username")
    }

    getPasswordField() {
        return cy.get("#password")
    }

    getConfirmPasswordField() {
        return cy.get("#confirmPassword")
    }

    fillFirstName(value: string) {
        this.getFirstNameField().type(value)
    }

    fillLastName(value: string) {
        this.getLastNameField().type(value)
    }

    fillUsername(value: string) {
        this.getUsernameField().type(value)
    }

    fillPassword(value: string) {
        this.getPasswordField().type(value)
    }

    fillConfirmPassword(value: string) {
        this.getConfirmPasswordField().type(value)
    }
    
    clearAllFields() {
        this.getFirstNameField().clear().blur()
        this.getLastNameField().clear().blur()
        this.getUsernameField().clear().blur()
        this.getPasswordField().clear().blur()
        this.getConfirmPasswordField().clear().blur()
    }

    getSignUpButton() {
        return cy.get(".MuiButton-label");
    }


}

export default SignupPage;