'use client';
import WorkspacesSidebar from '@/components/workspaces/sidebar';
import WorkSpacesTopbar from '@/components/workspaces/topbar';
import CreatedFormsGroup from '@/components/workspaces/workspace/created-forms-group';
import WorkspaceHeader from '@/components/workspaces/workspace/header';
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
    router.push('/auth/login?callback=unauthorized');
  }

  return (
    <div className="bg-slate-50/50">
      <WorkSpacesTopbar className="h-16" />
      <div className="flex w-full">
        <WorkspacesSidebar className="h-[calc(100vh-64px)]" />
        <div className="px-4 py-6 lg:px-8 space-y-10 w-full">
          <WorkspaceHeader />
          <CreatedFormsGroup />
        </div>
      </div>
    </div>
  );
}
