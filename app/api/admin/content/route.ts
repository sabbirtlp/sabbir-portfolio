import { NextResponse } from "next/server";
import { getContent, updateContent } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getContent();
  if (!content) {
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  try {
    const newContent = await request.json();
    const success = await updateContent(newContent);
    
    if (success !== true) {
      console.error("updateContent failed:", success);
      return NextResponse.json({ error: `failed to save content. Check server logs.` }, { status: 500 });
    }
    
    return NextResponse.json({ message: "Content updated successfully" });
  } catch (error: any) {
    console.error("POST /api/admin/content error:", error);
    
    if (error.message && error.message.includes("EROFS: read-only file system")) {
      return NextResponse.json({ error: "VERCEL ERROR: You cannot save files properly without a database. You must create a Free MongoDB Atlas Database and add 'MONGODB_URI' in your Vercel Environment Variables. See my chat message for steps!" }, { status: 500 });
    }

    return NextResponse.json({ error: `Failed to save content (Exception): ${error.message}` }, { status: 500 });
  }
}
