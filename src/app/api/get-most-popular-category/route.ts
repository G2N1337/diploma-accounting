import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import { isLogged } from "@/utils/middlewares/isLogged";
import AccountPosition from "@/utils/schemas/account-position";

export async function GET() {
  try {
    await dbConnect();

    const user = await isLogged();

    const mostCommonCategory = await AccountPosition.aggregate([
      {
        $match: {
          //@ts-expect-error: flip off
          user: user?._id
        }
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "expensecategories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryData"
        }
      },
      { $unwind: '$categoryData' },
      { $sort: { count: -1 }, },
      { $limit: 5 }
    ]);

    return NextResponse.json({ data: mostCommonCategory, success: true });
  } catch (error) {
    console.error("Ошибка ", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
