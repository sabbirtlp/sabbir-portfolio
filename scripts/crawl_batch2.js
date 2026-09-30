const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const websites = [
  { url: 'https://quijadalawfirm.com/', slug: 'quijada-law-firm' },
  { url: 'https://macburton.com/', slug: 'mac-burton' },
  { url: 'https://www.aanbouwprofs.nl/', slug: 'aanbouw-profs' },
  { url: 'https://sercs.org/', slug: 'sercs-organization' },
  { url: 'https://maximustexas.com/', slug: 'maximus-texas' },
  { url: 'https://gdm-consulting.co.uk/', slug: 'gdm-consulting' },
  { url: 'https://renovolution.ca/', slug: 'renovolution' },
  { url: 'https://zackpainter.com/', slug: 'zack-painter' },
  { url: 'https://turfwargear.com/', slug: 'turf-war-gear' },
  { url: 'https://mchughbuildersnj.com/', slug: 'mchugh-builders-nj' },
  { url: 'https://sultanre.com/', slug: 'sultan-real-estate' },
  { url: 'https://bluetomatostudio.com/', slug: 'blue-tomato-studio' },
  { url: 'https://tlcarpentryconstruction.com/', slug: 'tl-carpentry-construction' },
  { url: 'https://oneforlaw.com/', slug: 'one-for-law' },
  { url: 'https://www.sabrinali.law/', slug: 'sabrina-li-law' },
  { url: 'https://northhomesolutions.com/', slug: 'north-home-solutions' },
  { url: 'https://buildingamericallc.com/', slug: 'building-america-llc' },
  { url: 'https://hetlandhomeimprovement.com/', slug: 'hetland-home-improvement' },
  { url: 'https://thesavourygroup.com/', slug: 'the-savoury-group' },
  { url: 'https://ascenthomesflorida.com/', slug: 'ascent-homes-florida' },
  { url: 'https://gbrothersc.com/', slug: 'g-brothers-construction' },
  { url: 'https://smrealtorsgroup.com/', slug: 'sm-realtors-group' },
  { url: 'https://legalnurseservices.biz/', slug: 'legal-nurse-services' },
  { url: 'https://smallshopinc.com/', slug: 'small-shop-inc' },
  { url: 'https://andersonfamilyconstruction.com/', slug: 'anderson-family-construction' },
  { url: 'https://freshcoatspaintingandplastering.com/', slug: 'fresh-coats-painting' },
  { url: 'https://colageneconstruction.com/', slug: 'colagene-construction' },
  { url: 'https://constructionbuddiesllc.com/', slug: 'construction-buddies' },
  { url: 'https://southcoastroofingsystems.co.uk/', slug: 'south-coast-roofing-systems' },
  { url: 'http://megabytepro.com/', slug: 'megabyte-pro' },
  { url: 'https://neosnet-us.com/', slug: 'neosnet-us' },
  { url: 'https://agmconstructioninc.com/', slug: 'agm-construction-inc' },
  { url: 'https://clevelandprofessionalconstruction.com/', slug: 'cleveland-professional-construction' },
  { url: 'https://apexbuilts.com/', slug: 'apex-builts' },
  { url: 'https://www.claylawva.com/', slug: 'clay-law-group' },
  { url: 'https://topgunsweeping.com/', slug: 'top-gun-sweeping' },
  { url: 'https://rifconbuilding.com.au/', slug: 'rifcon-building' },
  { url: 'https://texasfoundationcompany.com/', slug: 'texas-foundation-company' },
  { url: 'http://apexlabourhire.com/', slug: 'apex-labour-hire' },
  { url: 'https://abcaustinhomerenovations.com/', slug: 'abc-austin-home-renovations' },
  { url: 'https://www.dtggroup.co.uk/', slug: 'dtg-group' },
  { url: 'https://briaxerservices.com/', slug: 'briaxer-services' },
  { url: 'https://thevanguardtrusthouse.com/', slug: 'the-vanguard-trust-house' },
  { url: 'https://bridgingwaterstogether.com/', slug: 'bridging-waters-together' },
  { url: 'https://victoryfreight.co.za/', slug: 'victory-freight' }
];

async function run() {
  console.log(`Starting crawl of ${websites.length} websites...`);
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const resultsFile = path.join(process.cwd(), 'scripts', 'crawl_batch2_results.json');
  let results = [];
  if (fs.existsSync(resultsFile)) {
    try {
      results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
    } catch {}
  }

  const processedUrls = new Set(results.filter(r => r.screenshotSuccess).map(r => r.url));

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--window-size=1440,900',
      '--ignore-certificate-errors'
    ]
  });

  for (let i = 0; i < websites.length; i++) {
    const item = websites[i];
    if (processedUrls.has(item.url)) {
      console.log(`[${i + 1}/${websites.length}] Skipping already crawled: ${item.url}`);
      continue;
    }

    console.log(`\n[${i + 1}/${websites.length}] Visiting: ${item.url}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36');

    let metadata = {
      url: item.url,
      slug: item.slug,
      title: '',
      metaDesc: '',
      h1: '',
      screenshotSuccess: false,
      screenshotPath: '',
      thumbnailPath: '',
      error: null
    };

    try {
      try {
        await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 25000 });
      } catch (navErr) {
        console.warn(`networkidle2 timed out, attempting domcontentloaded for ${item.url}`);
        await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
      }

      await new Promise(r => setTimeout(r, 2000));

      metadata.title = await page.title().catch(() => '');
      metadata.metaDesc = await page.evaluate(() => {
        const meta = document.querySelector('meta[name="description"]') || document.querySelector('meta[property="og:description"]');
        return meta ? meta.getAttribute('content') : '';
      }).catch(() => '');

      metadata.h1 = await page.evaluate(() => {
        const h1 = document.querySelector('h1') || document.querySelector('h2');
        return h1 ? h1.innerText.trim().replace(/\s+/g, ' ') : '';
      }).catch(() => '');

      console.log(`  Title: "${metadata.title}"`);
      console.log(`  H1: "${metadata.h1}"`);

      const timestamp = Date.now();
      const screenshotFilename = `screencapture-${item.slug}-${timestamp}.webp`;
      const thumbnailFilename = `thumb-${item.slug}-${timestamp}.webp`;

      const fullScreenshotPath = path.join(uploadsDir, screenshotFilename);
      const fullThumbnailPath = path.join(uploadsDir, thumbnailFilename);

      // Try full page screenshot
      let fullCaptured = false;
      try {
        await page.screenshot({
          path: fullScreenshotPath,
          fullPage: true,
          type: 'webp',
          quality: 85
        });
        fullCaptured = true;
      } catch (err) {
        console.warn(`  Full page capture failed for ${item.url}:`, err.message);
      }

      // Thumbnail (viewport)
      try {
        await page.screenshot({
          path: fullThumbnailPath,
          fullPage: false,
          type: 'webp',
          quality: 85
        });
        if (!fullCaptured) {
          // Fallback if fullPage failed: use thumbnail as full screenshot too
          fs.copyFileSync(fullThumbnailPath, fullScreenshotPath);
          fullCaptured = true;
        }
      } catch (thumbErr) {
        console.warn(`  Thumbnail capture failed:`, thumbErr.message);
      }

      if (fullCaptured) {
        metadata.screenshotSuccess = true;
        metadata.screenshotPath = `/uploads/${screenshotFilename}`;
        metadata.thumbnailPath = `/uploads/${thumbnailFilename}`;
        console.log(`  -> Saved: ${metadata.screenshotPath}`);
      } else {
        metadata.error = 'Failed to capture screenshot';
      }
    } catch (err) {
      console.error(`  Error processing ${item.url}:`, err.message);
      metadata.error = err.message;
    } finally {
      await page.close().catch(() => {});
      // Update results
      const existingIdx = results.findIndex(r => r.slug === item.slug);
      if (existingIdx >= 0) {
        results[existingIdx] = metadata;
      } else {
        results.push(metadata);
      }
      fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
    }
  }

  await browser.close().catch(() => {});
  console.log(`\nAll done! Total processed: ${results.length}`);
}

run().catch(console.error);
