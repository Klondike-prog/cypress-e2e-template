
export default class NavMenu  {
    
    elements = {
        accountButton: () => cy.get('a.account'),
        userMenu: () => cy.get('#menu')
    }

}
