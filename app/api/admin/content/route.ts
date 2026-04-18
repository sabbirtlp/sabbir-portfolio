import { NextResponse } from "next/server";
import { getContent, updateContent } from "@/lib/storage";

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
      return NextResponse.json({ error: `failed to save content: updateContent returned false. Check server logs.` }, { status: 500 });
    }
    
    return NextResponse.json({ message: "Content updated successfully" });
  } catch (error: any) {
    console.error("POST /api/admin/content error:", error);
    return NextResponse.json({ error: `Failed to save content (Exception): ${error.message}` }, { status: 500 });
  }
}
