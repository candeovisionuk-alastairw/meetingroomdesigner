import { create } from 'zustand';
import { RoomConfig } from './types';

interface RoomState {
  config: RoomConfig;
  updateConfig: (newConfig: Partial<RoomConfig>) => void;
  reset: () => void;
}

const defaultConfig: RoomConfig = {
  dimensions: { width: 6, depth: 8, height: 3 },
  table: { shape: 'rectangle', width: 2, depth: 1, seats: 6 },
  equipment: {
    ledWall: false,
    screen: false,
    vcKit: false,
    camera: false,
    speakers: false,
  },
  wallStyle: {
    mode: 'texture',
    texture: 'standard-gray',
    color: '#cccccc',
    thickness: 0.05,
    autoHide: true,
  },
};

export const useRoomStore = create<RoomState>((set) => ({
  config: defaultConfig,
  updateConfig: (newConfig) =>
    set((state) => ({
      config: {
        ...state.config,
        ...newConfig,
        dimensions: { ...state.config.dimensions, ...newConfig.dimensions },
        table: { ...state.config.table, ...newConfig.table },
        equipment: { ...state.config.equipment, ...newConfig.equipment },
        wallStyle: { ...state.config.wallStyle, ...newConfig.wallStyle },
      },
    })),
  reset: () => set({ config: defaultConfig }),
}));
