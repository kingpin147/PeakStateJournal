const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// Load blog posts dynamically
const postsDirectory = path.join(__dirname, '..', 'src', 'content', 'posts');
const BASE_URL = 'https://www.peakstatejournal.com';

function getUrls() {
  const urls = [BASE_URL];
  if (fs.existsSync(postsDirectory)) {
    const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
    files.forEach(file => {
      const slug = file.replace(/\.mdx$/, '');
      urls.push(`${BASE_URL}/blog/${slug}`);
    });
  }
  return urls;
}

// Generate JWT token for Google Indexing API without external dependencies
function generateJwtToken(serviceAccount) {
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const base64UrlEncode = (str) => {
    return Buffer.from(JSON.stringify(str))
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(`${encodedHeader}.${encodedPayload}`);
  const signature = sign.sign(serviceAccount.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Exchange JWT token for access token
function getAccessToken(jwtToken) {
  return new Promise((resolve, reject) => {
    const postData = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwtToken}`;
    
    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.access_token) {
            resolve(json.access_token);
          } else {
            reject(new Error(`Failed to get token: ${body}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Request Google Indexing API to crawl a URL
function publishUrl(url, accessToken, type = 'URL_UPDATED') {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      url: url,
      type: type
    });

    const req = https.request({
      hostname: 'indexing.googleapis.com',
      path: '/v3/urlNotifications:publish',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve(json);
        } catch (e) {
          resolve({ error: 'Failed to parse response', body });
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Main function
async function run() {
  const credentialsPath = path.join(__dirname, '..', 'service-account.json');
  
  if (!fs.existsSync(credentialsPath)) {
    console.error(`\n❌ Error: service-account.json not found!`);
    console.log(`\nTo use the Google Instant Indexing API, please follow these steps:`);
    console.log(`1. Go to Google Cloud Console (https://console.cloud.google.com)`);
    console.log(`2. Create a project and enable the 'Web Search Indexing API'.`);
    console.log(`3. Create a Service Account, generate a JSON private key, and download it.`);
    console.log(`4. Save that downloaded JSON file as 'service-account.json' in the root directory of this project.`);
    console.log(`5. Add the service account email (e.g. your-service-account@...gserviceaccount.com) as an Owner/Full User in Google Search Console for '${BASE_URL}'.`);
    console.log(`6. Run this script again: node scripts/submit-indexing.js\n`);
    process.exit(1);
  }

  const serviceAccount = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
  console.log(`🔑 Service Account loaded: ${serviceAccount.client_email}`);
  
  console.log(`🔄 Generating authorization token...`);
  const jwt = generateJwtToken(serviceAccount);
  const token = await getAccessToken(jwt);
  console.log(`✅ Token retrieved successfully.`);

  const urls = getUrls();
  console.log(`\n📦 Found ${urls.length} URLs to submit to Google Search Console:\n`);

  for (const url of urls) {
    try {
      console.log(`🚀 Submitting: ${url}...`);
      const result = await publishUrl(url, token);
      if (result.error) {
        console.log(`   ⚠️ Response error:`, result.error.message || result.error);
      } else {
        console.log(`   ✅ Success: URL notification received. (Crawl queued)`);
      }
      // Brief delay to prevent hitting rate limits
      await new Promise(r => setTimeout(r, 200));
    } catch (e) {
      console.error(`   ❌ Failed to submit ${url}:`, e.message);
    }
  }

  console.log(`\n🎉 Google Indexing API submission complete.`);
}

run().catch(err => {
  console.error('\n💥 Critical Error running indexer:', err);
});
