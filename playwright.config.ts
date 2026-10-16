// import { defineConfig, devices } from '@playwright/test';

// export default defineConfig({
//   // 1. แก้ไข testDir ให้ตรงกับโฟลเดอร์จริงของคุณ (tests/integration)
//   testDir: './tests/system',

//   use: {
//     baseURL: 'https://www.saucedemo.com',
//     trace: 'on-first-retry',
//     screenshot: 'only-on-failure',
//     video: 'retain-on-failure',
//   },

//   // 2. ตั้งค่า Reporter
//   reporter: [
//     ['html', { outputFolder: 'playwright-report', open: 'never' }]
//   ],

//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },
//   ],
// });
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  timeout: 30_000,

  retries: 0,

  workers: 1,

  reporter: [

    ['list'],

    ['html', { outputFolder: 'playwright-report', open: 'never' }],

    ['json', { outputFile: 'reports/results.json' }],

  ],

  use: {

    baseURL: 'https://www.saucedemo.com',

    screenshot: 'only-on-failure',

    trace: 'retain-on-failure',

    video: 'retain-on-failure',

  },

  projects: [

    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },

  ],

});
