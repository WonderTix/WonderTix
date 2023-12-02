import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import notes from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedPPHNotes(prisma: PrismaClient) {
  let totalNotesCount = 0;
  let missingContactsCount = 0;

  try {
    const notesCount = await prisma.pphNotes.count();
    if (notesCount > 0) {
      console.log('PPH_Notes table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./yaml-seeder-data/PPH_notes.yaml', 'utf8');
    const data = yaml.load(yamlData);

    for (const item of data) {
      totalNotesCount++;
      let canInsert = true;

      if (item.contact_id) {
        const contactExists = await prisma.pphContacts.findUnique({
          where: {contact_id: item.contact_id},
        });

        if (!contactExists) {
          missingContactsCount++;
          canInsert = false;

          if (process.env.ENV === 'prd') {
            console.log(`Skipping note with ID ${item.note_id} due to non-existing contact with ID ${item.contact_id}`);
          }
        }
      }

      if (canInsert) {
        await prisma.pphNotes.create({
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

    console.log(`PPH_Notes seeding completed. Total Notes processed: ${totalNotesCount}. Notes skipped due to missing Contacts: ${missingContactsCount}`);
  } catch (error) {
    console.error('Failed to seed PPH_notes:', error);
  }
}

module.exports = seedPPHNotes;
