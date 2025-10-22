
import { BasePage } from './BasePage';
import Logger from '../utils/logger';

class LoginPage extends BasePage {

    elements = {
        emailInput: () => this.getByDataTestId('email'),
        passwordInput: () => this.getByDataTestId('password'),
        submitLoginButton: () => this.getByDataTestId('login-submit'),
    }

    load() {
        this.loadEndpoint(`/auth/login`)
    }

    fillEmail(email) {
        this.elements.emailInput().type(email);
    }

    fillPassword(password) {
        this.elements.passwordInput().type(password);
    }

    submitLogin() {
        this.elements.submitLoginButton().click();
    }

    fillAndSubmitLogin(email, password) {
        this.fillEmail(email);
        this.fillPassword(password);
        this.submitLogin();
        this.assertUserMenu()

    }
    assertUserMenu() {
        this.header.elements.userMenu.should('be.visible')
        this.header.elements.userMenu.should('contain.text', 'John Doe')
        // Logger.passed(`User Menu has been found`)
    }
} export const loginPage = new LoginPage();
