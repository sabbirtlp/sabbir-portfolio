const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

async function main() {
    const workspaceRoot = process.cwd();
    const dataPath = path.join(workspaceRoot, 'data', 'site-content.json');
    const envPath = path.join(workspaceRoot, '.env.local');

    if (!fs.existsSync(dataPath)) {
        console.error('data/site-content.json not found');
        process.exit(1);
    }

    const raw = fs.readFileSync(dataPath, 'utf8');
    const content = JSON.parse(raw);

    if (!fs.existsSync(envPath)) {
        console.error('.env.local not found; cannot read MONGODB_URI');
        process.exit(1);
    }

    const envRaw = fs.readFileSync(envPath, 'utf8');
    const match = envRaw.match(/^MONGODB_URI=(.*)$/m);
    const uri = match ? match[1].trim().replace(/^"|"$/g, '') : null;

    if (!uri) {
        console.error('MONGODB_URI not found in .env.local');
        process.exit(1);
    }

    console.log('Connecting to MongoDB...');
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

    try {
        await client.connect();
        const db = client.db('portfolio_db');
        const col = db.collection('site_content');

        const res = await col.updateOne(
            { type: 'main_content' },
            { $set: { data: content, updatedAt: new Date() } },
            { upsert: true }
        );

        console.log('Update result:', res.result || res);
        console.log('Content pushed to MongoDB successfully.');
    } catch (err) {
        console.error('Failed to update MongoDB:', err);
        process.exit(1);
    } finally {
        await client.close();
    }
}

main();
