import fs from "fs/promises";
import path from "path";
import clientPromise from "./mongodb";

const DATA_FILE = path.join(process.cwd(), "data", "site-content.json");
const DB_NAME = "portfolio_db";
const COLLECTION_NAME = "site_content";

export async function getContent() {
  try {
    // Load local JSON as the baseline (always available)
    let localData: any = null;
    try {
      const raw = await fs.readFile(DATA_FILE, "utf-8");
      localData = JSON.parse(raw);
    } catch {
      console.warn("Could not read local JSON fallback.");
    }

    // 1. Try MongoDB if connected
    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        
        const doc = await collection.findOne({ type: "main_content" });
        if (doc && doc.data) {
          // Merge: use DB data but backfill any keys that exist in local JSON but not in DB
          // This ensures newly added fields (e.g. reviews) are available without manual DB migration
          if (localData) {
            for (const key of Object.keys(localData)) {
              const dbVal = doc.data[key];
              // Backfill if DB value is missing, null, or an empty array
              if (dbVal === undefined || dbVal === null || (Array.isArray(dbVal) && dbVal.length === 0)) {
                doc.data[key] = localData[key];
              }
            }
          }
          return doc.data;
        }
      } catch (dbError) {
        console.warn("MongoDB connection failed or timed out. Falling back to local JSON...");
      }
    }

    // 2. Fallback to Local JSON (useful for first-time migration or local dev without DB)
    return localData;
  } catch (error) {
    console.error("Error reading content:", error);
    return null;
  }
}

export async function updateContent(newContent: any) {
  try {
    // 1. Try MongoDB if connected
    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
      const collection = db.collection(COLLECTION_NAME);

      await collection.updateOne(
        { type: "main_content" },
        { $set: { data: newContent, updatedAt: new Date() } },
        { upsert: true }
      );
      
      // Also write locally in dev mode just to keep files synced, errors ignored if read-only
      if (process.env.NODE_ENV === "development") {
        await fs.writeFile(DATA_FILE, JSON.stringify(newContent, null, 2), "utf-8").catch(e => console.warn("Could not sync local JSON"));
      }
      return true;
    }

    // 2. Fallback strictly to Local JSON (Will throw EROFS in production)
    console.warn("No MongoDB connected. Attempting local file write...");
    await fs.writeFile(DATA_FILE, JSON.stringify(newContent, null, 2), "utf-8");
    return true;
  } catch (error: any) {
    console.error("Error updating content:", error);
    throw error;
  }
}
