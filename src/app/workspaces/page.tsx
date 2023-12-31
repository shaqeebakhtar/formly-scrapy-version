'use client';
import OnboardLoading from '@/components/workspaces/onboard-loading';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type User = {
  id: string;
  email: string;
};

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')!)
  );

  if (!user || !user.id) {
    typeof window !== 'undefined' &&
      router.push('/auth/login?callback=unauthorized');
  }

  return <OnboardLoading />;
}
