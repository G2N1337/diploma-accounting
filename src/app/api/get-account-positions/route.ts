import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import { isLogged } from "@/utils/middlewares/isLogged";
import AccountPosition from "@/utils/schemas/account-position";
import AccountChangeType from "@/utils/schemas/account-change-type";
import ExpenseCategories from "@/utils/schemas/expense-categories";

export async function GET() {
  try {
    await dbConnect();

    const user = await isLogged();

    const positions = await AccountPosition.find({
      //@ts-expect-error: IDK
      user: user?.id,
    })
      .populate({ path: 'category', model: ExpenseCategories })
      .populate({ path: 'type', model: AccountChangeType })
      .lean();

    return NextResponse.json({ data: positions, success: true });
  } catch (error) {
    console.error("Ошибка ", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
