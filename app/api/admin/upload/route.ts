import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif", "image/gif", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      console.error(`Rejected file type: ${file.type}`);
      return NextResponse.json(
        { error: "Invalid file type. Allowed: SVG, JPG, PNG, WebP, AVIF, GIF" },
        { status: 400 }
      );
    }

    // Validate file size (max 4.5MB for Vercel body limits)
    const maxSize = 4.5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size on Vercel is 4.5MB." },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true, // This replaces our manual timestamp logic
    });

    console.log(`Successfully uploaded to Vercel Blob: ${blob.url}`);
    return NextResponse.json({ path: blob.url });
  } catch (error: any) {
    console.error("Vercel Blob upload error detail:", error);
    
    // Check if token is missing
    if (error.message && error.message.includes("BLOB_READ_WRITE_TOKEN")) {
      return NextResponse.json(
        { error: "Storage not configured. Ensure BLOB_READ_WRITE_TOKEN is set in Vercel/Env." }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
