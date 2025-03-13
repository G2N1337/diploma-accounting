import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import { isLogged } from "@/utils/middlewares/isLogged";
import AccountPosition from "@/utils/schemas/account-position";
import { AccountingType } from "@/app/components/navbar/validation";
import AccountChangeType from "@/utils/schemas/account-change-type";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const user = await isLogged()

    if (user) {
      const body: AccountingType = await req.json()


      const plusOperationType = await AccountChangeType.findOne({
        name: 'Пополнение'
      })

      if (body.type === plusOperationType?._id.toString()) {
        //@ts-expect-error: IDK
        user.balance += body.amount
      } else {
        //@ts-expect-error: IDK
        user.balance -= body.amount
      }

      //@ts-expect-error: IDK
      user.save()

      //@ts-expect-error: IDK
      const accountChange = new AccountPosition({ ...body, user: user?._id })

      await accountChange.save()

      return NextResponse.json({ accountChange })
    }
    return NextResponse.json({ status: 'error' }, { status: 400 })

  } catch (error) {
    console.error("Ошибка создания записи:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
