import { it } from "mocha";

// Test suite for the Main Page
describe('Main Page', () => {

    beforeEach(() => {
        // Goes to the site
        cy.visit('http://localhost:19006/');
        cy.testLogin();
    });

    it('should swipe left', () => {
        cy.get('[data-testid="currentImage"]').find('img').invoke('attr', 'src').then((src1) => {
            const src = src1
            cy.swipeLeft()
            cy.get('[data-testid="currentImage"]').find('img').invoke('attr', 'src').then((src2) => {
                expect(src2).to.not.equal(src)
            })
        })
        // cy.get('[data-testid="currentImage"]').then(($img) => {
        //     cy.get
        //     cy.swipeLeft()
        //     cy.get('[data-testid="currentImage"]').then(($img2) => {
        //         const newImageSource = $img2.src()
        //         expect(imageSource).to.not.equal(newImageSource)
        //     })
        // })
    })
})