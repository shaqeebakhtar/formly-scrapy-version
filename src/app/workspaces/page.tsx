'use client';
import OnboardLoading from '@/components/workspaces/onboard-loading';
import useUser from '@/hooks/use-user';
import { useAuth } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type User = {
  id: string;
  email: string;
};

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user')!)
  );

  if (!user || !user.id) {
    router.push('/auth/login?callback=unauthorized');
  }

  return <OnboardLoading />;
}
