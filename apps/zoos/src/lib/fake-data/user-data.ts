import { faker } from "@faker-js/faker";

function createRandomUser() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 100 }),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
  };
}

type User = ReturnType<typeof createRandomUser>;

export { createRandomUser, type User };
