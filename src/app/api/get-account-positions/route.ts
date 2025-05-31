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
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const query = {
      //@ts-expect-error: IDK
      user: user?.id,
      ...(type ? { type } : {}),
      ...(category ? { category } : {}),
    };

    const [positions, total] = await Promise.all([
      AccountPosition.find(query)
        .sort({ date: -1, _id: -1 })
        .populate({ path: "category", model: ExpenseCategories })
        .populate({ path: "type", model: AccountChangeType })
        .skip(skip)
        .limit(limit)
        .lean(),
      AccountPosition.countDocuments(query),
    ]);

    return NextResponse.json({
      data: positions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      success: true,
    });
  } catch (error) {
    console.error("Ошибка ", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
