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
		cy.get('[data-testid="namefield"]').should('be.visible')
		cy.get('[data-testid="phonefield"]').should('be.visible')
		cy.get('[data-testid="emailfield"]').should('be.visible')
        cy.get('[data-testid="passfield"]').should('be.visible')
        cy.get('[data-testid="confirmpass"]').should('be.visible')
        cy.get('[data-testid="signupbtn"]').should('be.visible')
    });
	it('enter a account', () => {
		cy.get('[data-testid="namefield"]').type('jamal')
		cy.get('[data-testid="phonefield"]').type('test')
		cy.get('[data-testid="emailfield"]').type('jamal@test.edu')
        cy.get('[data-testid="passfield"]').type('test')
        cy.get('[data-testid="confirmpass"]').type('test')
        cy.get('[data-testid="signupbtn"]').click()
		it('enter next page2',() =>{
			cy.get('[data-testid="beginner"]').should('be.visible')
			cy.get('[data-testid="intermediate"]').should('be.visible')
			cy.get('[data-testid="advanced"]').should('be.visible')
			cy.get('[data-testid="nextbn1"]').should('be.visible')
			cy.get('[data-testid="advanced"]').click()
			cy.get('[data-testid="nextbn1"]').click()
			it('enter next page3',() =>{
				cy.get('[data-testid="metric"]').should('be.visible')
				cy.get('[data-testid="imperial"]').should('be.visible')
				cy.get('[data-testid="imperial"]').click()
				cy.get('[data-testid="nextbn2"]').click()
				it('enter page 4',() =>{
					cy.get('[data-testid="vegan"]').should('be.visible')
					cy.get('[data-testid="veg"]').should('be.visible')
					cy.get('[data-testid="pesc"]').should('be.visible')
					cy.get('[data-testid="none"]').should('be.visible')
					cy.get('[data-testid="nextbn3"]').should('be.visible')
					cy.get('[data-testid="none"]').click()
					cy.get('[data-testid="nextbn1"]').click()
		  
		  
				});
		  });
			
		});
    });

})