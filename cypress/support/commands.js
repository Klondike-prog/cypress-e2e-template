const { generateRegisterUser } = require("../fixtures/generateRegisterUser.payload")
import { registerUserApi } from "./api/registerUser.api"
const user = generateRegisterUser()

const elements = {
    inputEmail: () => cy.get('#email'),
    inputPassword: () => cy.get('#password'),
    buttonSubmit: () => cy.get('[data-test="login-submit"]'),
}

Cypress.Commands.add('userSession', () => {
    registerUserApi(user)
    cy.session(
        [user.email, user.password], 
        () => {
            cy.visit(`${Cypress.env('baseUrl')}/auth/login`);
            elements.inputEmail().type(user.email);
            elements.inputPassword().type(user.password);
            elements.buttonSubmit().click();
            cy.url().should('not.include', '/auth/login');
        },
        {
            cacheAcrossSpecs: true,
        }
    );
});