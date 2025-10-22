export function registerUserApi(user) {
    return cy.request({
        method: 'POST',
        url: `https://api.practicesoftwaretesting.com/users/register`, 
        followRedirect: false,
        body: {
            first_name: user.firstName,
            last_name: user.lastName,
            dob: user.dateOfBirth,
            phone: user.phoneNumber,
            email: user.email,
            password: user.password,
            street: user.street,
            city: user.city,
            state: user.state,
            postal_code: user.postalCode,
            country: user.country,
        }
    }).then((response) => {
        console.log(JSON.stringify(response.body));
        expect(response.status).to.equal(201);
    });
}
