import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: 'ADMIN', isProtected: true },
    { name: 'USER', isProtected: true },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { isProtected: role.isProtected },
      create: role,
    });
    console.log(`System Role: "${role.name}" created/updated`);
  }

  const adminRole = await prisma.role.findUnique({
    where: { name: 'ADMIN' },
  });
  if (!adminRole) {
    throw new Error('ADMIN not found after seeding');
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD!;
  const hashedPass = await bcrypt.hash(adminPassword, 10);

  const adminUser = await prisma.user.upsert({
    where: { username: adminUsername },
    update: {
      email: adminEmail,
      roleId: adminRole.id,
    },
    create: {
      username: adminUsername!,
      email: adminEmail,
      name: 'Administrator',
      roleId: adminRole.id,
    },
  });

  await prisma.account.upsert({
    where: {
      provider_providerAccountId: {
        provider: 'LOCAL',
        providerAccountId: adminEmail!,
      },
    },
    update: {
      password: hashedPass!,
    },
    create: {
      userId: adminUser.id,
      provider: 'LOCAL',
      providerAccountId: adminEmail!,
      password: hashedPass!,
    },
  });
  console.log('Administrator created/updated');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });