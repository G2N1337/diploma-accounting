import jwt from 'jsonwebtoken'
import User from "../schemas/users";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
export const isLogged = async () => {
  const headersList = await headers()

  const referer = headersList.get("authorization");

  const token = referer?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 400 });
  }

  const decoded = jwt.verify(token, process.env.TOKEN_SECRET || '');

  if (decoded) {
    // @ts-expect-error: Error here is expected and nothing is going to happen.
    const user = User.findById(decoded.id)
    return user;

  } else {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
}
