'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { RoomBox } from './RoomBox';

export default function RoomCanvas() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2}
      />
      <RoomBox />
    </Canvas>
  );
}
