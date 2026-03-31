import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received order:", body);

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 }
      );
    }

    const order = await db.order.create({
      data: {
        customerName: body.name,
        phone: body.phone,
        address: body.address,
        total: body.total,
        items: {
          create: body.items.map((item: any) => ({
            qty: item.qty,
            price: item.price,
            menuId: item.id,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, message: "Order saved", order });
  } catch (err) {
    console.error("Prisma create error:", err); // 🔥 important to see exact error
    return NextResponse.json(
      { success: false, message: "Failed to process order" },
      { status: 500 }
    );
  }
}