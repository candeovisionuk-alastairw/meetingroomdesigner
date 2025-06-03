export type TableShape = 'rectangle' | 'oval';

export interface RoomDimensions {
  width: number;
  depth: number;
  height: number;
}

export interface TableConfig {
  shape: TableShape;
  width: number;
  depth: number;
  seats: number;
}

export interface EquipmentOptions {
  ledWall: boolean;
  screen: boolean;
  vcKit: boolean;
  camera: boolean;
  speakers: boolean;
}

export interface WallStyle {
  mode: 'texture' | 'color';
  texture: 'standard-gray'; // extendable later
  color: string;
  thickness: number;
  autoHide: boolean;
}

export interface RoomConfig {
  dimensions: RoomDimensions;
  table: TableConfig;
  equipment: EquipmentOptions;
  wallStyle: WallStyle;
}
