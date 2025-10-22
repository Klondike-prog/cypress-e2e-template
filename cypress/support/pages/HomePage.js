
import { BasePage } from './BasePage';
import Logger from '../utils/logger';


class HomePage extends BasePage {

    elements = {
        cardBody: () => this.getByClass('card-body')
    }

    getCheckboxByLabel(label) {
        return cy.contains('label', label).find('input[type="checkbox"]')
    }

    load() {
        cy.visit(`${Cypress.env('baseUrl')}/home`)
    }
    checkLoggedInState(firstName, lastName) {
        this.load();
        this.assertMenu(firstName, lastName)
        // Logger.passed(`Check Logged In state for user: ${firstName} ${lastName}`)
    };
    filterItemsByCategory(category) {
        this.clickItemFilter(category)
        this.assertItemFilter(category)
    }
    clickItemFilter(label) {
        this.getCheckboxByLabel(label).click()
    }

    assertItemFilter(label) {
        const regex = new RegExp(label, 'i');

        this.elements.cardBody().each((el) => {
            cy.wrap(el).invoke('text').should('match', regex);
        }).then(cards => {
            // Logger.passed(`Total of ${cards.length} cards found with word: ${label}`);
        });
    }
    assertMenu(firstName, lastName) {
        this.header.elements.userMenu().should('be visible')
        this.header.elements.userMenu().should('contain.text', `${firstName} ${lastName}`)
    }

} export const homePage = new HomePage();
