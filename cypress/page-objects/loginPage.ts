class LoginPage {
    public usernameErrorText = "Username is required"
    public shortPasswordErrorText = "Password must contain at least 4 characters";
    public signInErrorText = "Username or password is invalid";

    navigate(){
        cy.visit("/signin")
    }
    
    getSignInLink(){
        return cy.get('[data-test=signup]');
    }

    getUsernameField() {
        return cy.get("#username")
    }

    getPasswordField() {
        return cy.get("#password")
    }

    getSignInButton() {
        return cy.get(".MuiButton-label")
    }

    fillUserNameField(value: string) {
        this.getUsernameField().type(value);
    }

    fillPasswordField(value: string) {
        this.getPasswordField().type(value);
    }

    getUsernameError(){
        return cy.get('#username-helper-text')
    }

    getPasswordError() {
        return cy.get('#password-helper-text')
    }

    clearUsernameField() {
        this.getUsernameField().clear().blur();
    }

    getSignInError() {
        return cy.get('[data-test=signin-error]');
    }

    getRememberMeCheckbox() {
        return cy.get('[data-test=signin-remember-me]');
    }

}
export default LoginPage;