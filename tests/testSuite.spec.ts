import { test, expect } from '@playwright/test'
import { LandingPage } from '../pages/landingPage'
import { JobApplicationPage } from '../pages/jobApplicationPage'

test('landing Page', async ({ page }) => {
  const landingPage = new LandingPage(page)
  const jobApplicationPage = new JobApplicationPage(page)

  await landingPage.navigateTo()
  await landingPage.takeFullPageScreenshot('landingPage.png')

  await landingPage.acceptCookies()
  await landingPage.navigateToJobs()
  
  const isTitleCorrect = await landingPage.verifyPageTitle()
  if (isTitleCorrect) {
    console.log('The title contains the expected text.')
  } else {
    console.log('The title does not contain the expected text.')
  }

  const jobLinks = await landingPage.getAllJobLinks();
  console.log('Job Links:', jobLinks);
  await landingPage.takeFullPageScreenshot('jobsPage.png');

  for (const link of jobLinks) {
    if (link.includes('test')) {
      const applyTo = link;
      console.log('Applying to:', applyTo);
      
      await page.goto(applyTo);
      await page.waitForSelector('button');

      await jobApplicationPage.takeFullPageScreenshot('beforeFillingDetails.png');
      await jobApplicationPage.fillPersonalDetails('Sourya Sumedh', 'sumedh0714@gmail.com');
      await jobApplicationPage.agreeToPrivacyPolicy();
      await jobApplicationPage.takeFullPageScreenshot('afterFillingDetails.png');
    }
  }
});
