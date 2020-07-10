class LandingPage {
  getTransactionList() {
    return cy.get("[data-test=transaction-list]");
  }
}
export default LandingPage;
