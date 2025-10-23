
import { BasePage } from './BasePage';

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
    assertUserMenu(firstName, lastName) {
        const fullName = firstName + ' ' + lastName
        this.header.elements.userMenu.should('be.visible')
        this.header.elements.userMenu.should('contain.text', fullName)
    }
} export const loginPage = new LoginPage();
