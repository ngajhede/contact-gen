import { faker } from "@faker-js/faker";
import { stringify } from "csv-stringify";
import fs from "fs";

const numRows = 1000000; // Replace with desired number of rows
const name = `./output/generated-contacts-${faker.datatype.string()}.csv`;

const records = [];

for (let i = 0; i < numRows; i++) {
  const name = faker.name.fullName();
  const countryCode = 45;
  const phoneNumber = faker.datatype.number({
    min: 1000000,
  });
  records.push({ name, countryCode, phoneNumber });
}

stringify(
  records,
  {
    header: true,
    columns: {
      name: "Name",
      countryCode: "Country Code",
      phoneNumber: "Phone Number",
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
