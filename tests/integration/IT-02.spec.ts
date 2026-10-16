import { test, expect } from '@playwright/test';

test('IT-02: DRIVER login state -> REAL Inventory and Cart', {
  annotation: {
    type: 'description',
    description: 'ใช้ Driver เตรียมสถานะ Login เพื่อทดสอบ Inventory และ Cart จริง'
  }
}, async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

  await test.step('สร้าง Driver และเปิด Inventory', async () => {
    // สร้าง BrowserContext และใช้ driverOpenInventory() ตั้งค่า Cookie
    await page.goto('/');
    await page.evaluate(() => {
      // ฟังก์ชัน driverOpenInventory() จำลองการ Login และตั้งค่า Cookie
      document.cookie = "session-username=standard_user; path=/";
    });
    // โหลดหน้าเว็บใหม่อีกครั้งเพื่อให้ระบบอ่าน Cookie ที่ตั้งค่าไว้
    await page.goto('/inventory.html');
  });

  await test.step('ตรวจสอบ Inventory จริง', async () => {
    // ตรวจสอบสินค้า 6 รายการ[cite: 1]
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  await test.step('เพิ่มสินค้า 2 รายการ', async () => {
    // เพิ่ม Backpack และ Bike Light แล้วตรวจสอบ Cart Badge = 2[cite: 1]
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');    
  });

  await test.step('ตรวจสอบสินค้าใน Cart', async () => {
    // เปิด Cart และตรวจสอบชื่อสินค้าทั้งสองรายการ[cite: 1]
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('.inventory_item_name')).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
    ]);
  });

  // ปิด BrowserContext ที่สร้างเองเมื่อสิ้นสุดการทดสอบ
  await context.close();
});