
export default class Header  {
    
    elements = {
        accountButton: () => cy.get('a.account'),
        userMenu: () => cy.get('[data-test="nav-menu"]')
    }

}
