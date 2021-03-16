import { it } from "mocha";

// Test suite for the Register Page
describe('Register Page', () => {

    beforeEach(() => {
        // Goes to the site
        cy.visit('http://localhost:19006/');
        cy.get('[data-testid="registerButton"]').click()
    });

    // Make sure the page loads
    it('loads the register page', () => {

    });

})