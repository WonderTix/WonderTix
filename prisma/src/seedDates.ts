import {PrismaClient} from '@prisma/client';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Import dates from YAML file to database
 * @param {PrismaClient} prisma
 */
async function seedDates(prisma: PrismaClient) {
  try {
    const datesCount = await prisma.date.count();
    if (datesCount > 0) {
      console.log('Dates table already seeded.');
      return;
    }

    const yamlData = fs.readFileSync('./yaml-seeder-data/date.yaml', 'utf8');
    const data: any[] = yaml.load(yamlData);

    const preparedData = data.map((item) => ({
      dateid: item.dateid,
      date_actual: new Date(item.date_actual),
      day_name: item.day_name,
      day_of_week: item.day_of_week,
      day_of_month: item.day_of_month,
      day_of_quarter: item.day_of_quarter,
      day_of_year: item.day_of_year,
      week_of_month: item.week_of_month,
      week_of_year: item.week_of_year,
      month_actual: item.month_actual,
      month_name: item.month_name,
      quarter: item.quarter,
      year_actual: item.year_actual,
      first_day_of_week: new Date(item.first_day_of_week),
      last_day_of_week: new Date(item.last_day_of_week),
      first_day_of_month: new Date(item.first_day_of_month),
      last_day_of_month: new Date(item.last_day_of_month),
      first_day_of_quarter: new Date(item.first_day_of_quarter),
      last_day_of_quarter: new Date(item.last_day_of_quarter),
      first_day_of_year: new Date(item.first_day_of_year),
      last_day_of_year: new Date(item.last_day_of_year),
      weekend: item.weekend,
    }));

    await prisma.date.createMany({
      data: preparedData,
    });

    console.log('Dates seeding completed.');
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedDates;
