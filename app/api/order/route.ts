import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received order:", body);

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 },
      );
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 },
      );
    }

    const accessToken = authHeader.substring(7);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const userEndpoint = new URL("/auth/v1/user", supabaseUrl).toString();

    const userResponse = await fetch(userEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: supabaseAnonKey,
      },
    });

    if (!userResponse.ok) {
      const errorDetail = await userResponse.text();
      console.error("Supabase auth error:", errorDetail);
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 },
      );
    }

    const userData = await userResponse.json();
    const userId = userData.id;

    if (!userId) {
      console.error("Supabase auth response missing user id", userData);
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 },
      );
    }

    const order = await db.order.create({
      data: {
        userId,
        userEmail: userData.email || null,
        userDisplayName:
          userData.user_metadata?.display_name ||
          userData.user_metadata?.name ||
          null,
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
      { status: 500 },
    );
  }
}
