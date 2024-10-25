'use client';
import { redirect } from 'next/navigation';
import { useGetCurrentUser } from '@/features/auth/api/useGetCurrentUser';
import { useLogout } from '@/features/auth/api/useLogout';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { data: currentUser, isLoading, isSuccess } = useGetCurrentUser();
  const { mutate: logout } = useLogout();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    redirect('/sign-in');
  }

  return (
    <>
      {isSuccess && <p>Hello, {currentUser.data.name}</p>}
      <Button onClick={() => logout()}>Logout</Button>
    </>
  );
}
