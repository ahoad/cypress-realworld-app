import BankAccountPage from "../../page-objects/bankAccountPage";

describe("Bank accounts", () => {
    const bankAccountPage = new BankAccountPage()

    beforeEach(() => {
      //Login via API
      cy.getUsers().then((users) => {
      cy.loginByXstate(users[0].username);
      cy.getCookie("connect.sid").should("exist");

      bankAccountPage.navigate();

    });
  });

  it("should be able to add new bank account", () => {
      bankAccountPage.getBankAccountList().should("be.visible")
      bankAccountPage.getCreateButton().click()
      bankAccountPage.fillBankName("Test Bank");
      bankAccountPage.fillRouteNumber("123456789");
      bankAccountPage.fillAccountNumber("123456789");
      bankAccountPage.getSubmitButton().click();


  });
});
