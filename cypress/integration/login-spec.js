import { it } from "mocha";

describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:19006/');
    });

    // Test checks that login page has expected elements
    it('loads the login page', () => {
        // Looks to see if email input field exists
        cy.get('[data-testid="emailInput"]')
        // Looks to see if password input field exists
        cy.get('[data-testid="passwordInput"]')
        // Looks to see if login button exists
        cy.get('[data-testid="loginButton"]')
        // Looks to see if register button exists
        cy.get('[data-testid="registerButton"]')
    })


})