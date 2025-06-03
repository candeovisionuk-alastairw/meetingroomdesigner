// src/lib/types.ts

export type TableShape = 'rectangle' | 'oval';

export interface RoomDimensions {
  width: number; // in meters
  depth: number;
  height: number;
}

export interface TableConfig {
  shape: TableShape;
  width: number;  // total table width
  depth: number;  // total table depth
  seats: number;
}

export interface EquipmentOptions {
  ledWall: boolean;
  screen: boolean;
  vcKit: boolean;
  camera: boolean;
  speakers: boolean;
}

export interface RoomConfig {
  dimensions: RoomDimensions;
  table: TableConfig;
  equipment: EquipmentOptions;
}
