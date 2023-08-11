import { faker } from "@faker-js/faker";
import { stringify } from "csv-stringify";
import fs from "fs";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 10);

const numRows = 3274; // Replace with desired number of rows
const name = `./output/generated-contacts-${faker.datatype.string()}.csv`;

const records = [];

const countryCodes = [44, 45, 46, 47, 48, 49];

for (let i = 0; i < numRows; i++) {
  const name = faker.name.fullName();
  const countryCode = countryCodes[faker.datatype.number(5)];
  const phoneNumber = nanoid();
  const hasTag = faker.datatype.boolean();
  records.push({ name, countryCode, phoneNumber, hasTag });
}

stringify(
  records,
  {
    header: true,
    columns: {
      name: "Name",
      countryCode: "Country Code",
      phoneNumber: "Phone Number",
      hasTag: "Tag",
    },
  },
  (err, output) => {
    if (err) throw err;
    fs.writeFile(name, output, (err) => {
      if (err) throw err;
      console.log("csv saved.");
    });
  }
);
