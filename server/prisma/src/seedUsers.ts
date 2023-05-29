const fs = require('fs');
const yaml = require('js-yaml');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Import users from YAML file to database
 */
async function seedUsers() {
  try {
    const usersCount = await prisma.users.count();
    if (usersCount > 0) {
      console.log('Users table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/legacy-data/users.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      userid: item.userid,
      username: item.username,
      is_superadmin: item.is_superadmin === 'true',
      auth0_id: item.auth0_id,
    }));

    await prisma.users.createMany({
      data: preparedData,
    });

    console.log('Users seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedUsers;
