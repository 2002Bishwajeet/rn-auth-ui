import Loading from '@/components/Loading';
import { useAuth } from '@/contexts/AuthContext';
import { router, Stack } from 'expo-router';
import { useEffect } from 'react';

export default function Layout() {
  const { authState } = useAuth();

  useEffect(() => {
    if (authState === 'pending') {
      return;
    }
    if (authState === 'authenticated') {
      router.replace('(root)');
    }
    if (authState === 'unauthenticated') {
      router.replace('/');
    }
  }, [authState]);

  if (authState === 'pending') {
    return <Loading />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    />
  );
}
