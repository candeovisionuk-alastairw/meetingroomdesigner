'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { RoomBox } from './RoomBox';
import TableMesh from './TableMesh';
import { useState } from 'react';
import { useRoomStore } from '@/lib/store';

function RoomSceneWrapper() {
  const camera = useThree((state) => state.camera);
  const { config } = useRoomStore();
  const autoHide = config.wallStyle.autoHide;

  const [hideFrontWall, setHideFrontWall] = useState(true);

  useFrame(() => {
    if (!autoHide) return;
    const camZ = camera.position.z;
    const shouldHide = camZ > 0;
    if (shouldHide !== hideFrontWall) {
      setHideFrontWall(shouldHide);
    }
  });

  return (
    <>
      <RoomBox hideFrontWall={hideFrontWall} />
      <TableMesh />
    </>
  );
}

export default function RoomCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 75 }}
      onCreated={({ gl }) => {
        const canvas = gl.getContext();
        if (canvas) {
          canvas.canvas.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn('🔁 WebGL context lost — attempting recovery');
          });
        }
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2}
      />
      <RoomSceneWrapper />
    </Canvas>
  );
}
