

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/db-connect';
import User from '@/utils/schemas/users';
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { login, password } = req.body;

        const user = await User.findOne({ login });
        if (user && (await user.matchPassword(password))) {
          res.status(200);
          res.json({
            _id: user._id,
            login: user.login,
            name: user.name,
            token: jwt.sign({ id: user._id }, process.env.TOKEN_SECRET || '', {
              expiresIn: '30d',
            }),
            role: user.role
          });

        } else {
          res.status(401);
          throw new Error('Invalid email or password');
        }
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
