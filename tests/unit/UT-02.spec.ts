import { test, expect } from '@playwright/test';

test('UT-02: product button state Add to cart -> Remove -> Add to cart', {

  annotation: {

    type: 'description',

    description: 'ตรวจสอบสถานะปุ่ม Add to cart และ Remove รวมถึง Cart Badge'

  }

}, async ({ page }) => {

  await test.step('Login เข้าสู่ระบบ', async () => {

    // Login และตรวจสอบหน้า Inventory
    await page.goto('/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

  });

  await test.step('ตรวจสอบปุ่มก่อนเพิ่มสินค้า', async () => {

    // ตรวจสอบปุ่ม Add to cart ของ Backpack
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();

  });

  await test.step('เพิ่มสินค้าเข้า Cart', async () => {

    // เพิ่มสินค้าและตรวจสอบปุ่ม Remove และ Cart Badge = 1
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  });

  await test.step('ลบสินค้าออกจาก Cart', async () => {

    // ลบสินค้า ตรวจสอบปุ่ม Add to cart และ Cart Badge หายไป
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();

  });

});
