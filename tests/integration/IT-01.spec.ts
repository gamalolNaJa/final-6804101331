
import { test, expect } from '@playwright/test';

test('IT-01: top-down REAL Login -> browser-level Inventory STUB', {

    annotation: {

        type: 'description',

        description: 'ทดสอบ Login จริงร่วมกับ Inventory Stub ที่จำลองด้วย page.setContent()'

    }

}, async ({ page }) => {

    await test.step('Login ผ่านหน้าเว็บไซต์จริง', async () => {
        await page.goto('/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL("/inventory.html");

        // Login และตรวจสอบ URL inventory.html

    });

    await test.step('สร้าง Inventory Stub', async () => {

        // ใช้ page.setContent() แสดง Mock Inventory Ready และสินค้าจำลอง 2 รายการ
        await page.setContent(`
            <h1>Mock Inventory Ready</h1>
            <div class="inventory_list">
                <div class="inventory_item">
                    <div class="inventory_item_name">Sauce Labs Backpack</div>
                    <div class="inventory_item_price">$29.99</div>
                </div>
                <div class="inventory_item">
                    <div class="inventory_item_name">Sauce Labs Bike Light</div>
                    <div class="inventory_item_price">$9.99</div>
                </div>
            </div>
        `);

    });

    await test.step('ตรวจสอบผลจาก Stub', async () => {

        await expect(page.getByRole('heading', { name: 'Mock Inventory Ready' })).toBeVisible();
        await expect(page.locator('.inventory_item')).toHaveCount(2);
        await expect(page.locator('.inventory_item_name')).toHaveText([
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
        ]);

    });

});
