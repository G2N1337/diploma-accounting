// hooks/useRequireAuth.ts
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserContext } from '@/context/user-context';

export default function useUserData(): User | null {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user && !localStorage.getItem('user')) {
      router.push('/sign-in');
    }
  }, [user, router]);

  return user;
}
