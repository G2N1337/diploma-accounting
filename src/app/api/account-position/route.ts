import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import { isLogged } from "@/utils/middlewares/isLogged";
import AccountPosition from "@/utils/schemas/account-position";
import { AccountingType } from "@/app/components/navbar/validation";
import AccountChangeType from "@/utils/schemas/account-change-type";
import Wallet from "@/utils/schemas/wallets";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const user = await isLogged()

    if (user) {
      const body: AccountingType = await req.json()

      const plusOperationType = await AccountChangeType.findOne({
        name: 'Пополнение'
      })

      const wallet = await Wallet.findById(body.wallet)

      if (body.type === plusOperationType?._id.toString()) {
        //@ts-expect-error: IDK
        wallet.balance += body.amount
      } else {
        //@ts-expect-error: IDK
        wallet.balance -= body.amount
      }

      wallet?.save()

      //@ts-expect-error: IDK
      const accountChange = new AccountPosition({ ...body, user: user?._id, wallet: wallet?.id })

      await accountChange.save()

      return NextResponse.json({ accountChange })
    }
    return NextResponse.json({ status: 'error' }, { status: 400 })

  } catch (error) {
    console.error("Ошибка создания записи:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
