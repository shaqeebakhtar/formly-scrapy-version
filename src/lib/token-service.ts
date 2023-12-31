import jwt from 'jsonwebtoken';

export const generateToken = async (payload: any) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
    expiresIn: '30d',
  });
};

export const verifyToken = async (token: string) => {
  return jwt.verify(token, process.env.TOKEN_SECRET as string);
};
