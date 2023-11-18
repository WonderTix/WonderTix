import {PrismaClient} from '@prisma/client';
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
    const data = yaml.load(yamlData);

    for (const item of data) {
      let canInsert = true;

      if (item.contact_id) {
        const contactExists = await prisma.contacts.findUnique({
          where: {contact_id: item.contact_id},
        });

        if (!contactExists) {
          canInsert = false;
          console.log(`Skipping note with ID ${item.note_id} due to non-existing contact with ID ${item.contact_id}`);
        }
      }

      if (canInsert) {
        await prisma.notes.create({
          data: {
            note_id: item.note_id,
            is_deleted: item.isdeleted || 0,
            contact_id: item.contact_id || null, // Contact FK
            account_id: item.account_id || null, // Account FK
            title: item.title,
            body: item.body,
            created_date: item.created_date ? new Date(item.created_date) : new Date(),
            last_modified_date: item.last_modified_date ? new Date(item.last_modified_date) : null,
          },
        });
      }
    }

    console.log('Notes seeding completed.');
  } catch (error) {
    console.error('Failed to seed notes:', error);
  }
}

module.exports = seedNotes;
