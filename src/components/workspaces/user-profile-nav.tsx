'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getInitials } from '@/lib/utils';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type UserProfileNavProps = {};

type User = {
  id: string;
  email: string;
};

export default function UserProfileNav({}: UserProfileNavProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user')!)
  );

  const logoutMutation = trpc.auth.logout.useMutation();

  const logOutUser = async () => {
    localStorage.removeItem('user');
    logoutMutation.mutate();
    router.push('/auth/login');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="font-semibold">
                {getInitials(user?.email.split('@')[0] as string)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium leading-none">{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Account settings</DropdownMenuItem>
            <DropdownMenuItem>Help center</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive focus:bg-destructive/10"
            onClick={logOutUser}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
