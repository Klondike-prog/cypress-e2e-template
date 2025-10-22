import { generateRegisterUser } from "../fixtures/generateRegisterUser.payload"
import { registerUserApi } from "../support/api/registerUser.api"
import { homePage } from "../support/pages/HomePage"
import { loginPage } from "../support/pages/LoginPage"


   const user = generateRegisterUser()

describe('example to-do app', () => {


  beforeEach(() => {
 
    // registerUserApi(user)
    cy.customerSession('user', 'pass')
  })

  it('displays two todo items by default', () => {
    homePage.load()
    cy.wait(3000)
    // loginPage.fillAndSubmitLogin(user.email, user.password)
   
  })
})

