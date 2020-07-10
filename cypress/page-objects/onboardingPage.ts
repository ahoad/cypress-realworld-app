class OnboardingPage {

    getOnboardingDialog(){
        return cy.get("[data-test=user-onboarding-dialog-title]");
    }

    getNextButton(){
        return cy.get("[data-test=user-onboarding-next]")
    }

}
export default OnboardingPage;