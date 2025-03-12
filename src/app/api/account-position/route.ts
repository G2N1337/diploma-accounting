import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import { isLogged } from "@/utils/middlewares/isLogged";
import AccountPosition from "@/utils/schemas/account-position";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const user = await isLogged()

    const body = await req.json()
    //@ts-expect-error: IDK
    const accountChange = new AccountPosition({ ...body, user: user?._id })
    //@ts-expect-error: IDK
    console.log({ ...body, user: user?._id })

    await accountChange.save()

    return NextResponse.json({ accountChange })
  } catch (error) {
    console.error("Ошибка создания записи:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
