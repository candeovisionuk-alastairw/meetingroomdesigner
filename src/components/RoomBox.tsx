'use client';

import { useRoomStore } from '@/lib/store';
import { useEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface RoomBoxProps {
  hideFrontWall?: boolean;
}

export function RoomBox({ hideFrontWall = true }: RoomBoxProps) {
  const { config } = useRoomStore();
  const { width, height, depth } = config.dimensions;
  const { color, thickness, autoHide } = config.wallStyle;

  const w = Math.min(Math.max(width, 0.1), 20);
  const h = Math.min(Math.max(height, 0.1), 10);
  const d = Math.min(Math.max(depth, 0.1), 20);

  const camera = useThree((state) => state.camera);

  const wallMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color || '#d3d3d3',
      side: THREE.BackSide,
    });
  }, [color]);

  const [walls, setWalls] = useState({
    left: true,
    right: true,
    back: true,
    front: !hideFrontWall,
  });

  useEffect(() => {
    console.log('ROOM DIMENSIONS:', { width: w, height: h, depth: d });
  }, [w, h, d]);

  useFrame(() => {
    const { x, z } = camera.position;
    setWalls({
      left: !autoHide || x > 0,
      right: !autoHide || x < 0,
      back: !autoHide || z > 0,
      front: !hideFrontWall,
    });
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="#d3d3d3" />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, h, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="#d3d3d3" />
      </mesh>

      {walls.left && (
        <mesh position={[-w / 2 + thickness / 2, h / 2, 0]}>
          <boxGeometry args={[thickness, h, d]} />
          <primitive object={wallMaterial} attach="material" />
        </mesh>
      )}

      {walls.right && (
        <mesh position={[w / 2 - thickness / 2, h / 2, 0]}>
          <boxGeometry args={[thickness, h, d]} />
          <primitive object={wallMaterial} attach="material" />
        </mesh>
      )}

      {walls.back && (
        <mesh position={[0, h / 2, -d / 2 + thickness / 2]}>
          <boxGeometry args={[w, h, thickness]} />
          <primitive object={wallMaterial} attach="material" />
        </mesh>
      )}

      {walls.front && (
        <mesh position={[0, h / 2, d / 2 - thickness / 2]}>
          <boxGeometry args={[w, h, thickness]} />
          <primitive object={wallMaterial} attach="material" />
        </mesh>
      )}
    </group>
  );
}
