const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const websites = [
  { url: 'https://ontier.com.au/', slug: 'ontier-group' },
  { url: 'https://newdynamicbuilders.com/', slug: 'new-dynamic-builders' },
  { url: 'https://chadworthhomes.com/', slug: 'chadworth-homes' },
  { url: 'https://elevatedconstructionca.com/', slug: 'elevated-construction-ca' },
  { url: 'https://californiabusinessgroup.com/', slug: 'california-business-group' },
  { url: 'https://digitalgaming.io/', slug: 'digital-gaming' },
  { url: 'https://leebusinesslaw.com/', slug: 'lee-business-law' },
  { url: 'https://portuslaw.com/', slug: 'portus-law' },
  { url: 'https://www.fortiuslaw.com/', slug: 'fortius-law' },
  { url: 'https://reconconstructiongroup.com/', slug: 'recon-construction-group' },
  { url: 'https://sawtoothpeakexcavation.com/', slug: 'sawtooth-peak-excavation' },
  { url: 'https://www.sourceandsupplies.com/', slug: 'source-and-supplies' }
];

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--window-size=1440,900'
    ]
  });

  const results = [];
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  for (let i = 0; i < websites.length; i++) {
    const item = websites[i];
    console.log(`\n[${i + 1}/${websites.length}] Visiting: ${item.url}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    
    // Set realistic User-Agent
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
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait an extra second for animations or dynamic fonts to settle
      await new Promise(r => setTimeout(r, 2000));

      metadata.title = await page.title();
      metadata.metaDesc = await page.evaluate(() => {
        const meta = document.querySelector('meta[name="description"]') || document.querySelector('meta[property="og:description"]');
        return meta ? meta.getAttribute('content') : '';
      });
      metadata.h1 = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        return h1 ? h1.innerText.trim().replace(/\s+/g, ' ') : '';
      });

      console.log(`Page Title: "${metadata.title}"`);
      console.log(`Meta Desc: "${metadata.metaDesc}"`);
      console.log(`H1: "${metadata.h1}"`);

      const timestamp = Date.now();
      const screenshotFilename = `screencapture-${item.slug}-${timestamp}.webp`;
      const thumbnailFilename = `thumb-${item.slug}-${timestamp}.webp`;
      
      const fullScreenshotPath = path.join(uploadsDir, screenshotFilename);
      const fullThumbnailPath = path.join(uploadsDir, thumbnailFilename);

      // Full page screenshot
      await page.screenshot({
        path: fullScreenshotPath,
        fullPage: true,
        type: 'webp',
        quality: 85
      });

      // Viewport / Hero thumbnail
      await page.screenshot({
        path: fullThumbnailPath,
        fullPage: false,
        type: 'webp',
        quality: 85
      });

      metadata.screenshotSuccess = true;
      metadata.screenshotPath = `/uploads/${screenshotFilename}`;
      metadata.thumbnailPath = `/uploads/${thumbnailFilename}`;
      console.log(`Screenshot saved: ${metadata.screenshotPath}`);
    } catch (err) {
      console.error(`Error loading ${item.url}:`, err.message);
      metadata.error = err.message;
    } finally {
      await page.close();
      results.push(metadata);
    }
  }

  await browser.close();
  console.log('\n--- Finished all websites ---');
  fs.writeFileSync(path.join(process.cwd(), 'scripts', 'crawl_results.json'), JSON.stringify(results, null, 2));
  console.log('Results written to scripts/crawl_results.json');
}

run().catch(console.error);
