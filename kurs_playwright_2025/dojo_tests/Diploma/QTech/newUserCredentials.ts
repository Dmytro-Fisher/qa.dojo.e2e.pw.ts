import { faker } from "@faker-js/faker";

export const newEmail = `0${faker.string.alphanumeric(5)}@w30.me`;
export const newPhone = `+${faker.number.int()}`;
export const newTelegram = `@${faker.string.alpha(5)}`;
