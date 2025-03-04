import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db-connect';
import AccountChangeType from '@/utils/schemas/account-change-type';

export async function GET() {
  await dbConnect();

  try {
    const types = await AccountChangeType.find({});
    return NextResponse.json({ success: true, data: types }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}
