import { Page } from "@playwright/test";
class LandingPage {
    page: Page;
    constructor(page: Page) {
      this.page = page;
    }
  
    async navigateTo() {
      await this.page.goto("https://www.virtual-identity.com/");
    }
  
    async acceptCookies() {
      await this.page.getByTestId('uc-more-button').click();
      await this.page.getByTestId('uc-save-button').click();
    }
  
    async navigateToJobs() {
      await this.page.getByRole('link', { name: 'Jobs' }).click();
    }
  
    async verifyPageTitle() {
      const title = await this.page.title();
      return title.includes('Jobs');
    }
  
    async getAllJobLinks() {
      await this.page.waitForSelector('a');
      return await this.page.$$eval('a', links => {
        return links.map(link => link.getAttribute('href'))
                    .filter(href => href && href.includes('/jobs/'));
      });
    }
  
    async takeFullPageScreenshot(filename) {
      await this.page.screenshot({ path: filename, fullPage: true });
    }
  }
  
  export { LandingPage };
  