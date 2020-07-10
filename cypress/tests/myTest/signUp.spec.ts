import SignupPage from "../../page-objects/signupPage";
import LoginPage from "../../page-objects/loginPage";
import BankAccountPage from "../../page-objects/bankAccountPage";
import OnboardingPage from "../../page-objects/onboardingPage";

describe("User signs up", () => {
  const signupPage = new SignupPage();
  const loginPage = new LoginPage();
  const bankPage = new BankAccountPage();
  const onboardingPage = new OnboardingPage();

  beforeEach(() => {
    cy.task("db:seed");
    signupPage.navigate();
  });

  it("should be redirected to sign in page on clicking sign in link", () => {
    signupPage.getSignInLink().click();
    cy.url().should("include", "/signin");
  });

  it("should not be shown validation messages by default", () => {
    signupPage.getFirstNameError().should("not.be.visible");
    signupPage.getLastNameError().should("not.be.visible");
    signupPage.getUsernameError().should("not.be.visible");
    signupPage.getPasswordError().should("not.be.visible");
    signupPage.getConfirmPasswordError().should("not.be.visible");
  });

  it("should be shown validation messages for empty form fields", () => {
    signupPage.fillFirstName("FN");
    signupPage.fillLastName("LN");
    signupPage.fillUsername("U");
    signupPage.fillPassword("P");
    signupPage.fillConfirmPassword("P");

    signupPage.clearAllFields();

    signupPage.getFirstNameError().should("be.visible");
    signupPage.getFirstNameError().should("have.text", signupPage.firstNameErrorText);

    signupPage.getLastNameError().should("be.visible");
    signupPage.getLastNameError().should("have.text", signupPage.lastNameErrorText);

    signupPage.getUsernameError().should("be.visible");
    signupPage.getUsernameError().should("have.text", signupPage.usernameErrorText);

    signupPage.getPasswordError().should("be.visible");
    signupPage.getPasswordError().should("have.text", signupPage.emptyPasswordErrorText);

    signupPage.getConfirmPasswordError().should("be.visible");
    signupPage
      .getConfirmPasswordError()
      .should("have.text", signupPage.emptyConfirmPasswordErrorText);
  });

  it("should be shown validation messages for short password", () => {
    signupPage.fillPassword("P");

    signupPage.getPasswordError().should("be.visible");
    signupPage.getPasswordError().should("have.text", signupPage.shortPasswordErrorText);
  });

  it("should be shown validation message for mismatching password", () => {
    signupPage.fillPassword("Password");
    signupPage.fillConfirmPassword("Password123");

    signupPage.getConfirmPasswordError().should("be.visible");
    signupPage.getConfirmPasswordError().should("have.text", signupPage.passwordMismatchErrorText);
  });

  it("should be able to sign up, login and add bank details", () => {
    const username = "Username";
    const password = "Password";

    //sign up user
    signupPage.fillFirstName("First");
    signupPage.fillLastName("Last");
    signupPage.fillUsername(username);
    signupPage.fillPassword(password);
    signupPage.fillConfirmPassword(password);

    signupPage.getSignUpButton().click();
    cy.url().should("include", "/signin");

    //sign in user
    loginPage.fillUserNameField(username);
    loginPage.fillPasswordField(password);
    loginPage.getSignInButton().click();

    //notification pop up
    onboardingPage.getOnboardingDialog().should("be.visible");
    onboardingPage.getNextButton().click();

    //add bank details
    bankPage.fillBankName("Bank Name");
    bankPage.fillRouteNumber("123456789");
    bankPage.fillAccountNumber("123456789");
    bankPage.getSubmitButton().click();

    //finished notification
    onboardingPage.getOnboardingDialog().should("be.visible");
    onboardingPage.getNextButton().click();
    onboardingPage.getOnboardingDialog().should("not.be.visible");
  });

  // it("should be asked to add bank details after signing up", () => {
  //   const username = "Username";
  //   const password = "Password";

  //   cy.request("Post", "localhost:3001/users", {
  //     firstName: "first",
  //     lastName: "last",
  //     username: username,
  //     password: password,
  //     confirmPassword: password,
  //   });

  //   cy.request("Post", "localhost:3001/login", {
  //     type: "LOGIN",
  //     username: "Username",
  //     password: "Password",
  //   });

  //   cy.visit("/");
  // });
});
