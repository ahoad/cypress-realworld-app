/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
    
    /**
     * Returns all users in database
     */
    getUsers(): Chainable<Response>;

      /**
     * Logs-in user by using the UI
     */
    loginUi(username: string, password?: string): Chainable<Response>;
    

    /**
     * Logs-in user by using the API
     */
    loginApi(username: string, password?: string): Chainable<Response>;

    
    
  }
}