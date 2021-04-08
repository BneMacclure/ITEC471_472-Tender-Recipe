import { it } from "mocha";

// Test suite for the My Recipes Page
describe('My Recipes Page', () => {

    beforeEach(() => {
        // Goes to the site
        cy.visit('http://localhost:19006/');
		cy.get('[data-testid="emailInput"]').type('test@radford.edu')
        cy.get('[data-testid="passwordInput"]').type('password')
        cy.get('[data-testid="loginButton"]').click()

        cy.wait(5000)
		cy.get('[data-testid="myProfileNav"]').click()
		cy.get('[data-testid="myRecipebtn"]').click()
		
    });
	it('loads page', () => {
        // Check for an element on the Main Screen to validate we've arrived
		cy.wait(5000)
        cy.get('[data-testid="filterbtn"]').should('be.visible')
		cy.get('[data-testid="trashcan"]').should('be.visible')
		cy.get('[data-testid="food"]').should('be.visible')
		cy.get('[data-testid="share"]').should('be.visible')
		
    });
	it('delete item', () => {
		cy.wait(5000)
        // Check for an element on the Main Screen to validate we've arrived
		cy.get('[data-testid="food"]').should('be.visible')
		cy.get('[data-testid="trashcan"]').click()
		
    });
	

})