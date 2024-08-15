import Loading from '@/components/Loading';
import { useAuth } from '@/contexts/AuthContext';

import { router, Stack, usePathname } from 'expo-router';
import { useEffect } from 'react';

const public_routes = ['/login', '/forgot-password', '/reset-password'];

export default function Layout() {
  const { authState } = useAuth();
  const path = usePathname();
  console.log('path', path);

  useEffect(() => {
    if (authState === 'pending') {
      return;
    }
    if (authState === 'authenticated') {
      router.replace('(root)');
    }
    if (authState === 'unauthenticated' && !public_routes.includes(path)) {
      router.replace('/');
    }
  }, [authState, path]);

  if (authState === 'pending') {
    return <Loading />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name='login' />
      <Stack.Screen name='forgot-password' />
    </Stack>
  );
}
