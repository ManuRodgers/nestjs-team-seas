import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.donation.deleteMany();
  const alice = await prisma.donation.create({
    data: {
      count: 100,
      email: 'manu@gmail.com',
      displayName: 'Manu',
    },
  });
  console.log('🚀 ~ file: seed.ts ~ line 14 ~ main ~ alice', alice);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
