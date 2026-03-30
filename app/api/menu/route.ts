import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const image = formData.get("image") as File;

    if (!name || !description || isNaN(price) || !image) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${image.name}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const menu = await prisma.menu.create({
      data: {
        name,
        description,
        price,
        image: `/uploads/${fileName}`,
      },
    });

    return NextResponse.json(menu);
  } catch (error) {
    console.error("Error creating menu:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}