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
  const newContent = await request.json();
  const success = await updateContent(newContent);
  
  if (!success) {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
  
  return NextResponse.json({ message: "Content updated successfully" });
}
