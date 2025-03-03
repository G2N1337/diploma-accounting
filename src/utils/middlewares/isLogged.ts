import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import User from "../schemas/users";
export const isLogged = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const decoded = jwt.verify(token, process.env.TOKEN_SECRET || '');
  if (decoded) {
    // @ts-expect-error: Error here is expected and nothing is going to happen.
    await User.findById(decoded.id);

  } else {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}
