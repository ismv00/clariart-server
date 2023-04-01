import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
  await prisma.user.deleteMany();
  await prisma.customers.deleteMany();

  await Promise.all([
    prisma.user.create({
      data: {
        email: "ismv00@icloud.com",
        name: "Igor",
        password: "Igor2502",
      },
    }),
  ]);

  await Promise.all([
    prisma.customers.create({
      data: {
        name: "Flavia",
        email: "flaviavilharroels@gmail.com",
        phone: "67999228822",
        createdAt: new Date(),
      },
    }),
  ]);
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
