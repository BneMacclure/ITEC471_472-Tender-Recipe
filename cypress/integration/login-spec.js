import { it } from "mocha";

// Test suite for the Login Page
describe('Login Page', () => {

    beforeEach(() => {
        // Goes to the site
        cy.visit('http://localhost:19006/');
    });

    // Test checks that login page has expected elements
    it('loads the login page', () => {
        // Looks to see if email input field exists
        cy.get('[data-testid="emailInput"]').should('be.visible')
        // Looks to see if password input field exists
        cy.get('[data-testid="passwordInput"]').should('be.visible')
        // Looks to see if login button exists
        cy.get('[data-testid="loginButton"]').should('be.visible')
        // Looks to see if register button exists
        cy.get('[data-testid="registerButton"]').should('be.visible')
    });

    // Test invalid login attempt
    it('failure to login',  () => {
        // Type in the email, but not the password
        cy.get('[data-testid="emailInput"]').type('test@radford.edu')
        cy.get('[data-testid="loginButton"]').click()

        // Check to see if we got the usual elements. If we do, it's the Login page still
        cy.get('[data-testid="emailInput"]').should('be.visible')
        cy.get('[data-testid="passwordInput"]').should('be.visible')
        cy.get('[data-testid="loginButton"]').should('be.visible')
        cy.get('[data-testid="registerButton"]').should('be.visible')
    });

    // Test valid login attempt (test@radford.edu)
    it('succesffuly logs in as test@radford.edu', () => {
        // Type in the email and the password
        cy.get('[data-testid="emailInput"]').type('test@radford.edu')
        cy.get('[data-testid="passwordInput"]').type('password')
        cy.get('[data-testid="loginButton"]').click()

        // Check for an element on the Main Screen to validate we've arrived
        cy.get('[data-testid="recipeStackView"]').should('be.visible')
    });

    // Test valid login attempt (bmcclure3@radford.edu)
    it('succesffuly logs in as bmcclure3@radford.edu', () => {
        // Type in the email and the password
        cy.get('[data-testid="emailInput"]').type('bmcclure3@radford.edu')
        cy.get('[data-testid="passwordInput"]').type('password')
        cy.get('[data-testid="loginButton"]').click()

        // Check for an element on the Main Screen to validate we've arrived
        cy.get('[data-testid="recipeStackView"]').should('be.visible')
    });

})