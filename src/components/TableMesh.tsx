'use client';

import { useRoomStore } from '@/lib/store';
import { useMemo } from 'react';
import { useSpring, a } from '@react-spring/three';
import ChairMesh from './ChairMesh';

export default function TableMesh() {
  const { config } = useRoomStore();
  const { table, dimensions } = config;

  const margin = 2;
  const height = 0.3;
  const legHeight = 0.7;

  const { clampedWidth, clampedDepth } = useMemo(() => {
    const maxW = Math.max(dimensions.width - margin * 2, 1);
    const maxD = Math.max(dimensions.depth - margin * 2, 1);

    return {
      clampedWidth: Math.min(table.width, maxW),
      clampedDepth: Math.min(table.depth, maxD),
    };
  }, [table, dimensions]);

  const diameter = Math.min(clampedWidth, clampedDepth);

  const spring = useSpring({
    topY: legHeight + height / 2,
    legY: legHeight / 2,
    scaleW: clampedWidth,
    scaleD: clampedDepth,
    scaleDia: diameter,
    config: { tension: 120, friction: 18 },
  });

  const legSize = 0.1;
  const legRadius = 0.2;

  if (table.shape === 'rectangle') {
    const halfW = clampedWidth / 2;
    const halfD = clampedDepth / 2;

    return (
      <group>
        {/* Table Top */}
        <a.mesh position-y={spring.topY} scale-x={spring.scaleW} scale-z={spring.scaleD}>
          <boxGeometry args={[1, height, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </a.mesh>

        {/* Legs */}
        {[
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ].map(([xSign, zSign], i) => (
          <a.mesh
            key={i}
            position-x={xSign * (halfW - legSize / 2)}
            position-y={spring.legY}
            position-z={zSign * (halfD - legSize / 2)}
          >
            <boxGeometry args={[legSize, legHeight, legSize]} />
            <meshStandardMaterial color="#3a1f0f" />
          </a.mesh>
        ))}

        {/* Chairs (1 per side, facing in) */}
        <ChairMesh position={[0, 0, -clampedDepth / 2 - 0.6]} rotation={[0, 0, 0]} />
        <ChairMesh position={[0, 0, clampedDepth / 2 + 0.6]} rotation={[0, Math.PI, 0]} />
        <ChairMesh position={[-clampedWidth / 2 - 0.6, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <ChairMesh position={[clampedWidth / 2 + 0.6, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      </group>
    );
  }

  // Oval table
  return (
    <group>
      {/* Table Top (rotated to lie flat) */}
      <a.mesh
        position-y={spring.topY}
        rotation={[-Math.PI / 2, 0, 0]}
        scale-x={spring.scaleDia}
        scale-z={spring.scaleDia}
      >
        <cylinderGeometry args={[0.5, 0.5, height, 32]} />
        <meshStandardMaterial color="#8B4513" />
      </a.mesh>

      {/* Center Support */}
      <a.mesh position-y={spring.legY}>
        <cylinderGeometry args={[legRadius, legRadius, legHeight, 20]} />
        <meshStandardMaterial color="#3a1f0f" />
      </a.mesh>

      {/* Chairs: radial layout facing inward */}
      {[0, 90, 180, 270].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = Math.cos(rad) * (diameter / 2 + 0.6);
        const z = Math.sin(rad) * (diameter / 2 + 0.6);
        return (
          <ChairMesh
            key={i}
            position={[x, 0, z]}
            rotation={[0, -rad, 0]} // face inward
          />
        );
      })}
    </group>
  );
}
