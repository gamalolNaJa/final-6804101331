import { test, expect } from '@playwright/test';

test('ST-01: complete purchase of two products', {

    annotation: {

        type: 'description',

        description: 'ทดสอบการซื้อ Backpack และ Bike Light ตั้งแต่ Login จนสั่งซื้อสำเร็จ'

    }

}, async ({ page }) => {

    await test.step('Login และตรวจสอบ Inventory', async () => {

        // Login จริงผ่าน SauceDemo[cite: 2]
        await page.goto('/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page.locator('.inventory_item')).toHaveCount(6);

    });

    await test.step('เพิ่มสินค้าสองรายการ', async () => {

        // เพิ่ม Backpack และ Bike Light ตรวจสอบ Badge = 2[cite: 2]
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    });

    await test.step('ตรวจสอบ Cart', async () => {

        // ตรวจสอบชื่อสินค้าทั้งสองรายการ[cite: 2]
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page.locator('.cart_item')).toHaveCount(2);
        await expect(page.locator('.inventory_item_name')).toHaveText([
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
        ]);

    });

    await test.step('กรอก Checkout Information', async () => {

        // กรอกข้อมูลลูกค้าและกด Continue[cite: 2]
        await page.locator('[data-test="checkout"]').click();
        await page.locator('[data-test="firstName"]').fill('John');
        await page.locator('[data-test="lastName"]').fill('Doe');
        await page.locator('[data-test="postalCode"]').fill('10110');
        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL(/.*checkout-step-two.html/);

    });

    await test.step('ตรวจสอบ Overview และสั่งซื้อ', async () => {

        // ตรวจสอบรายการสินค้าแล้วกด Finish[cite: 2]
        await expect(page.locator('.cart_item')).toHaveCount(2);
        await page.locator('[data-test="finish"]').click();
        await expect(page).toHaveURL(/.*checkout-complete.html/);

    });

    await test.step('ตรวจสอบ Order Complete', async () => {

        // ตรวจสอบข้อความ Thank you for your order![cite: 2]
        await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

    });

});