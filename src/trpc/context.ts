import { authOptions } from '@/lib/auth-options';
import { verifyToken } from '@/lib/token-service';
import type { inferAsyncReturnType } from '@trpc/server';
import { id } from 'date-fns/locale';
import { Session, getServerSession } from 'next-auth';
import { cookies } from 'next/headers';

interface JwtPayload {
  id: string;
  email: string;
}

export const createContext = async () => {
  const session = (await getServerSession(authOptions)) as Session;
  const cookieStore = cookies();

  const accessToken = cookieStore.get('access_token');

  let user = null;

  if (accessToken) {
    user = (await verifyToken(accessToken?.value as string)) as JwtPayload;
  }

  return {
    user: {
      id: user?.id,
      email: user?.email,
    },
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
