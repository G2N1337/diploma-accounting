
import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import { isLogged } from "@/utils/middlewares/isLogged";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const user = await isLogged()

    if (user) {

      const body = await req.json()

      //@ts-expect-error: IDK
      user.balance = body.balance

      //@ts-expect-error: IDK
      await user.save()
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Ошибка создания записи:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
