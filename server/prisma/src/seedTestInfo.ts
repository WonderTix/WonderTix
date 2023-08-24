import {PrismaClient} from '@prisma/client';

/**
 * Imports test info from static const to database
 * @param {PrismaClient} prisma
 */
async function seedTestInfo(prisma: PrismaClient) {
  try {
    const testInfoCount = await prisma.testInfo.count();
    if (testInfoCount > 0) {
      await prisma.testInfo.upsert({
        where: {
          id: 1,
        },
        update: {},
        create: {
          id: 1,
          token: '',
        },
      });
      return;
    }
    await prisma.testInfo.create({
      data: {
        id: 1,
        token: '',
      },
    });
    console.log('Test info seeding completed.');
    return;
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedTestInfo;
