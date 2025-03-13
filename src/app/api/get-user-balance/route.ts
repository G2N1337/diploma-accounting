import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import { isLogged } from "@/utils/middlewares/isLogged";

export async function GET() {
  try {
    await dbConnect();

    const user = await isLogged();

    //@ts-expect-error: idc
    return NextResponse.json({ balance: user?.balance || null, success: true });
  } catch (error) {
    console.error("Ошибка ", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
