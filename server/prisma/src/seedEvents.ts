import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import events from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedEvents(prisma: PrismaClient) {
  try {
    const eventsCount = await prisma.events.count();
    if (eventsCount > 0) {
      console.log('Events table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./prisma/yaml-seeder-data/events.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      event_id: item.event_id,
      owner_id: item.owner_id,
      name: item.name,
      create_date: item.create_date ? new Date(item.create_date) : new Date(),
      last_modified_date: item.last_modified_date ? new Date(item.last_modified_date) : new Date(),
      active_flag: item.active_flag || 0,
      description: item.description,
      detail: item.detail,
      event_category: item.event_category,
      season: item.season,
      performance_date: item.performance_date ? new Date(item.performance_date) : new Date(),
      pre_post_show_email_flag: isNaN(item.pre_post_show_email_flag) ? null : item.pre_post_show_email_flag,
      pre_show_email_cutoff_minutes: isNaN(item.pre_show_email_cutoff_minutes) ? null : item.pre_show_email_cutoff_minutes || 0,
      pre_show_email_minutes: isNaN(item.pre_show_email_minutes) ? null : item.pre_show_email_minutes || 0,
      run_time: item.run_time,
    }));

    await prisma.events.createMany({
      data: preparedData,
    });

    console.log('Events seeding completed.');
  } catch (error) {
    console.error('Failed to seed events:', error);
  }
}

module.exports = seedEvents;
