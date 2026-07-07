import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

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
        { error: "File too large. Maximum size is 4.5MB." },
        { status: 400 }
      );
    }

    // Check if Vercel Blob token is available
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Production: Upload to Vercel Blob
      const { put } = await import("@vercel/blob");
      const blob = await put(file.name, file, {
        access: "public",
        addRandomSuffix: true,
      });

      console.log(`Successfully uploaded to Vercel Blob: ${blob.url}`);
      return NextResponse.json({ path: blob.url });
    }

    // Local development fallback: Save to public/uploads/
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const ext = path.extname(file.name) || `.${file.type.split("/")[1]}`;
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueName = `${baseName}-${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, uniqueName);

    // Write file to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;
    console.log(`Successfully saved locally: ${publicUrl}`);
    return NextResponse.json({ path: publicUrl });
  } catch (error: any) {
    console.error("Upload error detail:", error);

    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
