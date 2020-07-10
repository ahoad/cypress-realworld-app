///<reference path="../myglobal.d.ts" />

const defaultPassword = "s3cret"

import LoginPage from "../page-objects/loginPage";
const loginPage = new LoginPage();

Cypress.Commands.add("getUsers", () => {
  cy.readFile("./data/database.json").then((data) => data.users);
});

Cypress.Commands.add("loginUi", (username, password = defaultPassword) => {
  loginPage.fillUserNameField(username);
  loginPage.fillPasswordField(password);
  loginPage.getSignInButton().click();
});

Cypress.Commands.add("loginApi", (username, password = defaultPassword) => {
  Cypress.log({
    name: 'loginByForm',
    message: `${username} | ${password}`,
  })

  return cy.request({
    method: 'POST',
    url: 'localhost:3001/login',
    form: true,
    body: {"type":"LOGIN","username":"Katharina_Bernier","password":"s3cret"},
  })



})
