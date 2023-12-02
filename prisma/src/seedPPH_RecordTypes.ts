import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import recordtypes from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedPPHRecordTypes(prisma: PrismaClient) {
  try {
    const recordTypesCount = await prisma.pphRecordtype.count();
    if (recordTypesCount > 0) {
      console.log('PPH_RecordType table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./yaml-seeder-data/PPH_recordtypes.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      record_type_id: item.record_type_id,
      name: item.name,
      description: item.description,
      sobject_type: item.sobject_type,
      is_active: item.is_active || 0,
      created_date: item.created_date ? new Date(item.created_date) : new Date(),
      last_modified_date: item.last_modified_date ? new Date(item.last_modified_date) : new Date(),
      system_modstamp: item.system_modstamp ? new Date(item.system_modstamp) : new Date(),
      is_deleted: item.is_deleted || 0,
    }));

    await prisma.pphRecordtype.createMany({
      data: preparedData,
    });

    console.log('PPH_RecordTypes seeding completed.');
  } catch (error) {
    console.error('Failed to seed PPH_recordtypes:', error);
  }
}

module.exports = seedPPHRecordTypes;
