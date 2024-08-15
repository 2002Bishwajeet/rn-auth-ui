import Loading from '@/components/Loading';
import { useAuth } from '@/contexts/AuthContext';

import { router, Stack, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';

const public_routes = ['/login', '/forgot-password', '/reset-password'];

export default function Layout() {
  const { authState } = useAuth();
  // local loading state to prevent flickering
  const [loading, setLoading] = useState(true);
  const path = usePathname();
  // console.log('path', path);
  console.log('authState', authState);
  useEffect(() => {
    if (authState === 'pending') {
      return;
    }
    if (authState === 'authenticated') {
      router.navigate('(root)');
    }
    if (authState === 'unauthenticated' && !public_routes.includes(path)) {
      router.navigate('/');
    }
    if (loading) setLoading(false);
  }, [authState, loading, path]);

  if (loading) {
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
