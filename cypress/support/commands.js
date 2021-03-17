// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('swipeLeft', () => {
    cy.get('[data-testid="currentImage"')
    .find('img')
    .trigger('mousedown', { position: 'right', which: 1 })
    .trigger('mousemove', { position: 'left'})
    .trigger('mouseup', { force: true, position: 'left' })
})

Cypress.Commands.add('testLogin', () => {
    cy.get('[data-testid="emailInput"]').type('test@radford.edu')
    cy.get('[data-testid="passwordInput"]').type('password')
    cy.get('[data-testid="loginButton"]').click()
})