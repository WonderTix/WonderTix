import { PrismaClient } from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import notes from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedNotes(prisma: PrismaClient) {
  try {
    const notesCount = await prisma.notes.count();
    if (notesCount > 0) {
      console.log('Notes table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/notes.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      id: item.id,
      isdeleted: item.isdeleted || 0,
      contactid: item.contactid, // Contact FK
      accountid: item.accountid, // Account FK
      title: item.title,
      body: item.body,
      createddate: item.createddate ? new Date(item.createddate) : new Date(),
      lastmodifieddate: item.lastmodifieddate ? new Date(item.lastmodifieddate) : null,
    }));

    await prisma.notes.createMany({
      data: preparedData,
    });

    console.log('Notes seeding completed.');
  } catch (error) {
    console.error('Failed to seed notes:', error);
  }
}

module.exports = seedNotes;
