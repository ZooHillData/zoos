import { faker } from "@faker-js/faker";

function createRandomUser() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    join_date: faker.date.between({ from: "2025-01-01", to: "2025-01-31" }),
    age: faker.number.int({ min: 18, max: 100 }),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    states: faker.helpers.arrayElements(
      [
        faker.location.state(),
        faker.location.state(),
        faker.location.state(),
        faker.location.state(),
        faker.location.state(),
      ],
      { min: 1, max: 5 },
    ),
    zip: faker.location.zipCode(),
    phone: faker.helpers.arrayElements(
      [faker.phone.number(), faker.phone.number()],
      { min: 1, max: 2 },
    ),
    user_id: String(Math.round(Math.random() * 100000000000)),
  };
}

type User = ReturnType<typeof createRandomUser>;

export { createRandomUser, type User };
