import * as fs from "fs";
import * as path from "path";
import { faker } from "@faker-js/faker";

// const filePath = path.resolve(__dirname, "savedUserEmail.json");

export const newPhone = `+${faker.number.int()}`;
export const newName = `${faker.person.firstName()}`;
export const newEmail = `${newName}@gmail.com`;
export const password = "12345";

// Функція для збереження нового імені email
// export function saveNewUserEmail(userEmail: string, email: string): void {
//   let registrationCredentials = {};
//   if (fs.existsSync(filePath)) {
//     registrationCredentials = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//   }
//   registrationCredentials[userEmail] = email;
//   fs.writeFileSync(filePath, JSON.stringify(registrationCredentials, null, 1));
// }
