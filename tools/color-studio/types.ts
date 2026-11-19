export type StudioViewMode = 'swatch' | 'car' | 'closeup' | 'macro' | 'sphere';
export type StudioLightingPreset = 'studio' | 'gallery' | 'sunset';
export type StudioVehicleId = 'model3' | 'modely';

export interface ColorFilmItem {
  code: string;
  hex: string;
  shiftHex: string | null;
  finish: 'crystal' | 'metallic' | 'pearlescent' | 'chameleon' | 'special';
  material: { roughness: number; metalness: number; clearcoat: number; clearcoatRoughness: number };
}

export const STUDIO_VEHICLES = [
  { id: 'model3', modelUrl: './models/tesla-model-3.glb', targetLength: 4.15, rotationY: 0 },
  { id: 'modely', modelUrl: './models/tesla-model-y.glb', targetLength: 4.25, rotationY: Math.PI },
];
