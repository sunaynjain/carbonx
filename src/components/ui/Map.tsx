'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import type { MapClientProps } from './MapClient';

const MapClientDynamic = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-surface-muted animate-pulse rounded-lg flex items-center justify-center">Loading Map...</div>
});

export default function Map(props: MapClientProps) {
  return <MapClientDynamic {...props} />;
}
