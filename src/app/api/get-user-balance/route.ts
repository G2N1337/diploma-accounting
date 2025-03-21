import { NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import { isLogged } from "@/utils/middlewares/isLogged";
import Wallet from "@/utils/schemas/wallets";

export async function GET() {
  try {
    await dbConnect();

    const user = await isLogged();

    // Конвейер агрегирования с $facet для параллельного получения списка кошельков и суммы балансов
    const pipeline = [
      //@ts-expect-error: idc
      { $match: { user: user?._id } },
      {
        $facet: {
          total: [
            {
              $group: {
                _id: null,
                totalBalance: { $sum: "$balance" }
              }
            },
            { $project: { _id: 0, totalBalance: 1 } }
          ],
          wallets: [
            // Можно указать нужные поля или оставить без $project для возврата всех полей
            { $project: { user: 1, name: 1, balance: 1 } }
          ]
        }
      }
    ];

    const result = await Wallet.aggregate(pipeline);

    const totalBalance = result[0].total[0]?.totalBalance ?? 0;
    const wallets = result[0].wallets;

    return NextResponse.json({ wallets, totalBalance, success: true }, { status: 200 });
  } catch (error) {
    console.error("Ошибка ", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
