import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import { isLogged } from "@/utils/middlewares/isLogged";
import AccountPosition from "@/utils/schemas/account-position";
import AccountChangeType from "@/utils/schemas/account-change-type";

export async function GET() {
  try {
    await dbConnect();

    const user = await isLogged();

    const earningsType = await AccountChangeType.findOne({
      name: 'Пополнение'
    })

    const todaysEarnings = await AccountPosition.aggregate([
      {
        $match: {
          //@ts-expect-error: idc
          user: user?._id,
          type: earningsType?._id
        }
      },
      {

        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }

          },
          count: { $sum: 1 },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    return NextResponse.json({ data: todaysEarnings, success: true });
  } catch (error) {
    console.error("Ошибка ", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
