import { faker } from '@faker-js/faker';

export function generateRegisterUser() {
  return {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1984-01-01',
    street: faker.location.streetAddress(),
    postalCode: '400200',
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.countryCode(),
    phoneNumber: faker.string.numeric(10),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 12}) + "*"+"4",
  };
}
