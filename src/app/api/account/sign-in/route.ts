import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db-connect';
import User from '@/utils/schemas/users';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { login, password } = await request.json();

    const user = await User.findOne({ login });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET || '', {
        expiresIn: '30d',
      });

      return NextResponse.json(
        {
          _id: user._id,
          login: user.login,
          name: user.name,
          token,
        },
        { status: 200 }
      );

    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
