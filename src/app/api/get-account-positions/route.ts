import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import { isLogged } from "@/utils/middlewares/isLogged";
import AccountPosition from "@/utils/schemas/account-position";
import AccountChangeType from "@/utils/schemas/account-change-type";
import ExpenseCategories from "@/utils/schemas/expense-categories";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const user = await isLogged();

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const type = searchParams.get("type");

    const category = searchParams.get("category");

    const positions = await AccountPosition.find({
      //@ts-expect-error: IDK
      user: user?.id,
      ...(type ? { type } : {}),
      ...(category ? { category } : {}),
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
