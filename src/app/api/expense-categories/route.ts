import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db-connect';
import ExpenseCategories from '@/utils/schemas/expense-categories';

export async function GET() {
  await dbConnect();

  try {
    const types = await ExpenseCategories.find({});
    return NextResponse.json({ success: true, data: types }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}
