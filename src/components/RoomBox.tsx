'use client';

import { useRoomStore } from '@/lib/store';
import { useEffect } from 'react';

export function RoomBox() {
  const { config } = useRoomStore();
  const { width, height, depth } = config.dimensions;

  const w = Math.min(Math.max(width, 0.1), 20);
  const h = Math.min(Math.max(height, 0.1), 10);
  const d = Math.min(Math.max(depth, 0.1), 20);

  useEffect(() => {
    console.log('ROOM DIMENSIONS:', { width: w, height: h, depth: d });
  }, [w, h, d]);

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="saddlebrown" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, h, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>

      {/* Left Wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-w / 2, h / 2, 0]}>
        <planeGeometry args={[d, h]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>

      {/* Right Wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[w / 2, h / 2, 0]}>
        <planeGeometry args={[d, h]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>

      {/* Back Wall */}
      <mesh rotation={[0, 0, 0]} position={[0, h / 2, -d / 2]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color="lightcoral" />
      </mesh>

      {/* Front wall intentionally omitted for peek-in view */}
    </group>
  );
}
