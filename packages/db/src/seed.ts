import { db } from "./client";

async function seed() {
  console.log("Seeding database...");

  await db.destroy();
  console.log("Done.");
}

seed();
