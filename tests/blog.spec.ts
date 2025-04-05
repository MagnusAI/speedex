import { test, expect } from '@playwright/test';

test.describe('Dog Kennel Blog', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should display the kennel title', async ({ page }) => {
    // Check if the main title is visible
    await expect(page.getByRole('heading', { name: /terrier kennel/i })).toBeVisible();
  });

  test('should navigate to dogs page', async ({ page }) => {
    // Click on the "Our Dogs" button in the header (more specific selector)
    await page.getByRole('button', { name: 'Our Dogs', exact: true }).click();
    
    // Wait for navigation and content to load
    await page.waitForLoadState('networkidle');
    
    // Check if we're on the dogs page
    await expect(page.getByRole('heading', { name: /our dogs/i })).toBeVisible();
  });

  test('should filter dogs by name search', async ({ page }) => {
    // Navigate to dogs page using the header button
    await page.getByRole('button', { name: 'Our Dogs', exact: true }).click();
    await page.waitForLoadState('networkidle');

    // Check if search input is visible
    const searchInput = page.getByPlaceholder(/search dogs by name or description/i);
    await expect(searchInput).toBeVisible();

    // Type in search box
    await searchInput.fill('Rusty');
    await page.waitForLoadState('networkidle');

    // Check if dog cards are visible
    const dogCards = page.locator('.ant-card');
    await expect(dogCards).toHaveCount(1);
  });

  test('should filter dogs by breed', async ({ page }) => {
    // Navigate to dogs page using the header button
    await page.getByRole('button', { name: 'Our Dogs', exact: true }).click();
    await page.waitForLoadState('networkidle');

    // Find and click the breed selector - using more specific Ant Design Select structure
    const breedSelector = await page.getByTestId('breed-selector');
    await expect(breedSelector).toBeVisible();

    // Select Norfolk Terrier from the dropdown
    await breedSelector.click();
    await page.getByTestId('norfolk-terrier-option').isVisible();
    await page.getByTestId('norfolk-terrier-option').click();
    await page.waitForLoadState('networkidle');

    // Check if dog cards are visible
    const dogCards = page.locator('.ant-card');
    await expect(dogCards).toHaveCount(1);
  });

  test('should navigate to add dog page', async ({ page }) => {
    // Navigate to dogs page using the header button
    await page.getByRole('button', { name: 'Our Dogs', exact: true }).click();
    await page.waitForLoadState('networkidle');

    // Click add new dog button
    await page.getByRole('button', { name: 'Add New Dog' }).click();
    
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    
    // Check if we're on the add dog page
    await expect(page).toHaveURL(/.*\/dogs\/add/);
  });
}); 