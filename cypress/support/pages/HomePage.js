
import { BasePage } from './BasePage';



class HomePage extends BasePage {

    elements = {
        cardBody: () => this.getByClass('card-body'),
        cardTitle: () => this.getByDataTestId('product-name')
    }

    getCheckboxByLabel(label) {
        return cy.contains('label', label).find('input[type="checkbox"]')
    }
    load() {
        cy.visit(`${Cypress.env('baseUrl')}`)
    }
    checkLoggedInState(firstName, lastName) {
        this.load();
        this.assertMenu(firstName, lastName)
    };
    filterItemsByCategory(category, expectedCount) {
        this.clickItemFilter(category)
        this.assertItemFilter(category, expectedCount)
    }
    clickItemFilter(label) {
        this.getCheckboxByLabel(label).click()
    }

    assertItemFilter(label, expectedCount) {
        const regex = new RegExp(label, 'i');

        this.elements.cardTitle().should('have.length', expectedCount)
        this.elements.cardTitle().each((el) => {
            cy.wrap(el).invoke('text').should('match', regex);
        })
    }
    assertMenu(firstName, lastName) {
        this.navMenu.elements.userMenu().should('be.visible')
        this.navMenu.elements.userMenu().should('contain.text', `${firstName} ${lastName}`)
    }

} export const homePage = new HomePage();
