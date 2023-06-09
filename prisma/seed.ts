import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();
const pass = async () => hash('admin', 10);

async function main() {
  // create admin user if not exist
  const userAdmin = await prisma.user.upsert({
    where: { email: 'admin@g.com' },
    update: {},
    create: {
      email: 'admin@g.com',
      name: 'admin',
      password: pass.toString(),
      isAdmin: true,
    },
  });
  console.log({ userAdmin });
}

// execute the main function

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
