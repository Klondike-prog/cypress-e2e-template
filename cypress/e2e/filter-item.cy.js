import { homePage } from "../support/pages/HomePage"
const { generateRegisterUser } = require("../fixtures/generateRegisterUser.payload")

const user = generateRegisterUser()
describe('Test filter items component', () => {

  beforeEach(() => {
    cy.userSession()
  })

  it('Filter items by category type Hammer', () => {
    homePage.checkLoggedInState(user.firstName, user.lastName)
    homePage.filterItemsByCategory('Hammer', 7)
  })
  
})

