import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function manin() {
  const newLink = await prisma.link.create({
    data: {
      description: 'Fullstack tutorial for GraphQL',
      url: 'www.howtographql.com',
    },
  });

  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

manin()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
