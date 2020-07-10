import LoginPage from "../../page-objects/loginPage";
import LandingPage from "../../page-objects/landingPage";
import Sidebar from "../../page-objects/sidebar";

describe("User logs in", () => {
  const loginPage = new LoginPage();
  const landingPage = new LandingPage();
  const sidebar = new Sidebar();

  beforeEach(() => {
    loginPage.navigate();
  });

  it("should be redirected to sign up page on clicking sign up link", () => {
    loginPage.getSignInLink().click();
    cy.url().should("include", "/signup");
  });

  it("should be able to login and log out", () => {
    //Get first user from database and login with then on the UI
    cy.getUsers().then((users) => {
      cy.loginUi(users[0].username);
    });

    landingPage.getTransactionList().should("be.visible");

    //Assert cookie
    cy.getCookie("connect.sid").should("exist");
    cy.getCookie("connect.sid").should("not.have.property", "expiry");

    //Sign out
    sidebar.getLogOutButton().click();
    cy.url().should("include", "/signin");
    cy.getCookie("connect.sid").should("not.exist");
  });

  it("should be able to login and logout via api", () => {
    cy.getUsers().then((users) => {
      cy.loginApi(users[0].username);
    });
    cy.getCookie("connect.sid").should("exist");

    cy.request("POST", "localhost:3001/logout");
    cy.getCookie("connect.sid").should("not.exist");
  });

  it("should remember password on login", () => {
    loginPage.getRememberMeCheckbox().click();
    cy.getUsers().then((users) => {
      cy.loginUi(users[0].username);
    });

    landingPage.getTransactionList().should("be.visible");

    cy.getCookie("connect.sid").should("exist");
    cy.getCookie("connect.sid").should("have.property", "expiry");
  });

  it("should not be shown validation messages by default", () => {
    loginPage.getUsernameError().should("not.be.visible");
    loginPage.getPasswordError().should("not.be.visible");
  });

  it("should be shown validation messages for form fields", () => {
    loginPage.fillUserNameField("UN");
    loginPage.fillPasswordField("P");

    loginPage.clearUsernameField();

    loginPage.getUsernameError().should("be.visible");
    loginPage.getUsernameError().should("have.text", loginPage.usernameErrorText);
    loginPage.getPasswordError().should("be.visible");
    loginPage.getPasswordError().should("have.text", loginPage.shortPasswordErrorText);
  });

  it("should be shown error message when entering incorrect login details", () => {
    loginPage.fillUserNameField("UN");
    loginPage.fillPasswordField("Password");

    loginPage.getSignInButton().click();

    loginPage.getSignInError().should("be.visible");
    loginPage.getSignInError().should("have.text", loginPage.signInErrorText);
  });
});
