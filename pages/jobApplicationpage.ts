import { Page } from '@playwright/test';

export class JobApplicationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
    async fillPersonalDetails(name, email) {
      await this.page.getByPlaceholder('First Name Last Name').click();
      await this.page.getByPlaceholder('First Name Last Name').fill(name);
      await this.page.getByPlaceholder('example@mail.com').click();
      await this.page.getByPlaceholder('example@mail.com').fill(email);
    }
  
    async agreeToPrivacyPolicy() {
      await this.page.locator('input[name="bf49-4"]').click();
      await this.page.locator('label')
                    .filter({ hasText: 'I have read and understood the Privacy Policy regarding the processing of my per' })
                    .locator('span').nth(4).click();
    }
  
    async takeFullPageScreenshot(filename) {
      await this.page.screenshot({ path: filename, fullPage: true });
    }
  }
  
  