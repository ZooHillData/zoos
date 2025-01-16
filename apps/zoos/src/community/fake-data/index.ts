import { faker } from "@faker-js/faker";

const createData = faker.helpers.multiple;

export * from "./user-data";
export * from "./files";
export { createData };
