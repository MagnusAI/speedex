import { test, expect } from '@playwright/test';

test('should visit posts page and find navigation menu', async ({ page }) => {
  // Navigate to the posts page with the correct base URL
  await page.goto('/speedex/posts');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check if the Posts menu item is visible in the desktop menu
  const postsMenuItem = page.locator('.desktop-menu li[data-menu-id*="posts"]');
  await expect(postsMenuItem).toBeVisible();
  await expect(postsMenuItem).toHaveText('Posts');
}); 