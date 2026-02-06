const { test, expect } = require('@playwright/test');

test('should fill out commercial lease form using auto-fill and show preview', async ({ page }) => {
  // 1. Go to the property selection page
  await page.goto('/property');
  
  // 2. Click on "Commercial Lease"
  await page.click('text=Commercial Lease');
  
  // 3. Wait for the form to load and the Auto-fill button to be visible
  // Since it's development mode, the button should be there
  const autoFillBtn = page.locator('button:has-text("Quick Auto-Fill")');
  await expect(autoFillBtn).toBeVisible();
  
  // 4. Click the Auto-fill button
  await autoFillBtn.click();
  
  // 5. Verify some fields are filled
  const lessorName = page.locator('input[name="lessorName"]');
  await expect(lessorName).toHaveValue('Rajesh Kumar');
  
  // 6. Click the Preview button
  await page.click('button:has-text("Preview Commercial Lease Agreement")');
  
  // 7. Verify we are on the preview page
  // LeasePreview usually has an "Edit" button or specific text
  await expect(page.locator('text=Preview')).toBeVisible();
  await expect(page.locator('text=Rajesh Kumar')).toBeVisible();
});
