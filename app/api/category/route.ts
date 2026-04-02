// app/api/category/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json(categories);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}