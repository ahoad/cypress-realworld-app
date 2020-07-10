class BankAccountPage {
    navigate(){
        cy.visit("/bankaccounts");
    }
    
    getBankNameField(){
        return cy.get("#bankaccount-bankName-input")
    }
    getRoutingNumberField(){
        return cy.get("#bankaccount-routingNumber-input")
    }

    getAccountNumberField(){
        return cy.get("#bankaccount-accountNumber-input")
    }

    getSubmitButton(){
        return cy.get("[data-test=bankaccount-submit]")
    }

    fillBankName(value: string){
        this.getBankNameField().type(value)
    }

    fillRouteNumber(value: string){
        this.getRoutingNumberField().type(value)
    }

    fillAccountNumber(value: string){
        this.getAccountNumberField().type(value)
    }

    getBankAccountList() {
        return cy.get("[data-test=bankaccount-list]")
     
    }

    getCreateButton() {
        return cy.get('[data-test=bankaccount-new]')
    }
}
export default BankAccountPage;