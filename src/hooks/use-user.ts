'use client';
import { useAuth } from '@/store/auth';
import { useEffect, useRef, useState } from 'react';

type User = {
  id: string;
  email: string;
};

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')!));
  }, []);

  console.log(user);

  return user;
}
