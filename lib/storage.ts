import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "site-content.json");

export async function getContent() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading content:", error);
    return null;
  }
}

export async function updateContent(newContent: any) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(newContent, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error updating content:", error);
    return false;
  }
}
