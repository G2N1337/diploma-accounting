import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db-connect';
import User from '@/utils/schemas/users';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { login, password, name } = await request.json();

    // Проверка, существует ли уже пользователь
    const userExists = await User.findOne({ login });
    if (userExists) {
      return NextResponse.json(
        { success: false, error: 'Пользователь уже создан!' },
        { status: 400 }
      );
    }

    // Создание нового пользователя
    const user = await User.create({ login, password, name });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Ошибка создания пользователя' },
        { status: 400 }
      );
    }

    // Формирование ответа с токеном
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
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
