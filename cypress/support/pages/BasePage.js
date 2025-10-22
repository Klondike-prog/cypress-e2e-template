
import Header from '../components/header';
import Logger from '../utils/logger';

export class BasePage {
    elements = {

        pageTitle: () => cy.get('page-title'),
    }
    get header() {
        return new Header()
    }

    getByDataTestId(dataTestId) {
        return cy.get(`[data-test="${dataTestId}"]`)
    }
    getByClass(classAttribute) {
        return cy.get(`.${classAttribute}`)
    }

    checkPageTitle(title) {
        this.elements.pageTitle().should('have.text', title)
        // Logger.passed(`Title ${title} has been found`)
    }
    loadEndpoint(endpoint) {
        const fullURL = `${Cypress.env('baseUrl')}${endpoint}`;
        cy.visit(fullURL);
    }

}
