import { test, expect } from '@playwright/test';

test.describe('Add Dog Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the add dog page before each test
    await page.goto('/dogs/add');
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should display the add dog form', async ({ page }) => {
    // Check if the form title is visible
    await expect(page.getByRole('heading', { name: /add new dog/i })).toBeVisible();
    
    // Check if all required fields are present
    await expect(page.getByPlaceholder(/enter dog's name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/select breed/i)).toBeVisible();
    await expect(page.getByPlaceholder(/select date/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit without filling required fields
    await page.getByRole('button', { name: /add dog/i }).click();
    
    // Check for validation messages
    await expect(page.getByText(/please input the dog's name!/i)).toBeVisible();
    await expect(page.getByText(/please select the breed!/i)).toBeVisible();
    await expect(page.getByText(/please select the birth date!/i)).toBeVisible();
  });

  test('should prevent duplicate dog names', async ({ page }) => {
    // Fill in the form with an existing dog's name
    await page.getByPlaceholder(/enter dog's name/i).fill('Rusty');
    await page.getByPlaceholder(/select breed/i).click();
    await page.getByTestId('jack-russell-terrier-option').click();
    await page.getByPlaceholder(/select date/i).fill('2020-01-01');
    
    // Submit the form
    await page.getByRole('button', { name: /add dog/i }).click();
    await page.waitForLoadState('networkidle');
    
    // Check for duplicate name error
    await expect(page.getByText(/a dog named "rusty" already exists/i)).toBeVisible();
  });

  test('should handle image upload', async ({ page }) => {
    // Fill in required fields
    await page.getByPlaceholder(/enter dog's name/i).fill('New Dog');
    await page.getByPlaceholder(/select breed/i).click();
    await page.getByTestId('jack-russell-terrier-option').click();
    await page.getByPlaceholder(/select date/i).fill('2020-01-01');
    
    // Upload an image
    const fileInput = page.getByTestId('upload-button');
    await fileInput.setInputFiles('tests/assets/test-dog.jpg');
    
    // Check if image preview is visible
    await expect(page.getByAltText(/new dog/i)).toBeVisible();
  });

  test('should add achievements', async ({ page }) => {
    // Fill in required fields
    await page.getByPlaceholder(/enter dog's name/i).fill('New Dog');
    await page.getByPlaceholder(/select breed/i).click();
    await page.getByTestId('jack-russell-terrier-option').click();
    await page.getByPlaceholder(/select date/i).fill('2020-01-01');
    
    // Add an achievement
    await page.getByRole('button', { name: /add achievement/i }).click();
    
    // Fill achievement details
    await page.getByPlaceholder(/enter achievement title/i).fill('Best in Show');
    await page.getByPlaceholder(/select date/i).nth(1).fill('2023-01-01');
    
    // Check if achievement is added
    await expect(page.getByText(/best in show/i)).toBeVisible();
  });

  test('should successfully add a new dog', async ({ page }) => {
    // Fill in required fields
    await page.getByPlaceholder(/enter dog's name/i).fill('New Dog');
    await page.getByPlaceholder(/select breed/i).click();
    await page.getByTestId('jack-russell-terrier-option').click();
    await page.getByPlaceholder(/select date/i).fill('2020-01-01');
    
    // Submit the form
    await page.getByRole('button', { name: /add dog/i }).click();
    await page.waitForLoadState('networkidle');
    
    // Check if redirected to dogs page
    await expect(page).toHaveURL(/.*\/dogs/);
    
    // Check if success message is shown
    await expect(page.getByText(/dog added successfully/i)).toBeVisible();
  });
}); 