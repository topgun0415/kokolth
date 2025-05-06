import React from 'react';
import { Error } from '@/components/organisms/Error';

export default function NotFound() {
  return <Error status={'404'} />;
}
