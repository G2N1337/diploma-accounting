
import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import { isLogged } from "@/utils/middlewares/isLogged";
import { WalletType } from "@/utils/types/wallet";
import Wallet from "@/utils/schemas/wallets";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const user = await isLogged()

    if (user) {
      const body: WalletType = await req.json()

      //@ts-expect-error: idc
      const wallet = await Wallet.create({ name: body.name, balance: body.balance, user: user?._id })

      return NextResponse.json({ wallet })
    }

    return NextResponse.json({ status: 'error' })
  } catch (error) {
    console.error("Ошибка создания записи:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
