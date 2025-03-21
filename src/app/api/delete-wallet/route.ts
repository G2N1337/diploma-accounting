
import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import { isLogged } from "@/utils/middlewares/isLogged";
import Wallet from "@/utils/schemas/wallets";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const user = await isLogged()

    const body: { id: string } = await req.json()

    const wallet = await Wallet.findById(body.id)

    //@ts-expect-error: idc
    if (user && wallet?.user.toString() === user._id.toString()) {
      await wallet?.deleteOne()

      return NextResponse.json({ status: 'success' }, { status: 200 })
    }

    return NextResponse.json({ status: 'error' })
  } catch (error) {
    console.error("Ошибка создания записи:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
