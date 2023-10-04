import {test as setup, expect} from '@playwright/test';
import {DashboardPage} from './pages/dashboardPage';
import dotenv from 'dotenv';
import path from 'path';

// Construct the path to the .env file based on __dirname
if (!process.env.CI) {
  const envPath = path.join(__dirname, '../../.env');
  dotenv.config({path: envPath});
}

const authFile = 'playwright/.auth/user.json';


setup('dashboard_test',async({page})=>{
  setup.setTimeout(180000);

  const loginPage = new DashboardPage(page);

  await loginPage.TicketingDashboard();
  
});