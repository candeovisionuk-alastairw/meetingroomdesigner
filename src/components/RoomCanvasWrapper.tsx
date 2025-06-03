'use client';

import dynamic from 'next/dynamic';

const RoomCanvas = dynamic(() => import('./RoomCanvas'), { ssr: false });

export default function RoomCanvasWrapper() {
  return <RoomCanvas />;
}
