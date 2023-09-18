import { createServer } from "node:http";
import { Chance } from "chance";

export const server = createServer((request, response) => {
  const chance = new Chance();
  const name = chance.name({ prefix: true });
  const age = chance.age();
  const profession = chance.profession({ rank: true });
  response.end(
    `Hello, my name is ${name} and I am ${age} years old. I am a ${profession}.`
  );
});
