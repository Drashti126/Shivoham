import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { checkAdminSessionFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const isAdmin = checkAdminSessionFromRequest(req);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin login required." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;

    const filesToProcess: File[] = [];
    if (singleFile && singleFile.size > 0) {
      filesToProcess.push(singleFile);
    }
    if (files && files.length > 0) {
      files.forEach((f) => {
        if (f && f.size > 0 && !filesToProcess.includes(f)) {
          filesToProcess.push(f);
        }
      });
    }

    if (filesToProcess.length === 0) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    const savedUrls: string[] = [];
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    for (const file of filesToProcess) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Clean filename
      const originalName = file.name || "product-image.png";
      const ext = path.extname(originalName) || ".png";
      const mimeType = file.type || (ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png");
      const baseName = path
        .basename(originalName, ext)
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .toLowerCase();
      const uniqueName = `${Date.now()}-${baseName}${ext}`;

      // Target 1: Vercel Blob Storage (Production CDN)
      if (blobToken) {
        try {
          const blobRes = await fetch(
            `https://blob.vercel-storage.com/${uniqueName}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${blobToken}`,
                "x-content-type": mimeType,
              },
              body: buffer,
            }
          );
          if (blobRes.ok) {
            const blobData = await blobRes.json();
            if (blobData && blobData.url) {
              savedUrls.push(blobData.url);
              continue;
            }
          }
        } catch (blobErr) {
          console.warn("Vercel Blob upload failed, attempting fallback:", blobErr);
        }
      }

      // Target 2: Local disk storage (Development)
      let savedToLocal = false;
      try {
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const filePath = path.join(uploadsDir, uniqueName);
        fs.writeFileSync(filePath, buffer);
        savedUrls.push(`/uploads/${uniqueName}`);
        savedToLocal = true;
      } catch (fsErr) {
        // Filesystem is read-only (EROFS) on Vercel Serverless
        console.warn("Local storage write failed (expected on Vercel):", fsErr);
      }

      // Target 3: Built-in Data URL (Works everywhere on Vercel without external storage configuration)
      if (!savedToLocal) {
        const base64Data = buffer.toString("base64");
        const dataUrl = `data:${mimeType};base64,${base64Data}`;
        savedUrls.push(dataUrl);
      }
    }

    return NextResponse.json(
      {
        success: true,
        url: savedUrls[0],
        urls: savedUrls,
        message: `Successfully uploaded ${savedUrls.length} image(s)`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload image(s)" },
      { status: 500 }
    );
  }
}
