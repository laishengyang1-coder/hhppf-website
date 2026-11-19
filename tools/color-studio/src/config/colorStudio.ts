// H&H · AIOC™ color studio. Finish and hue groups retain the electronic catalog order.
export type StudioLanguage = 'zh' | 'en';

export function studioText(lang: StudioLanguage, zh: string, en: string): string {
  return lang === 'zh' ? zh : en;
}

export type FilmFinishType =
  | 'crystal'
  | 'metallic'
  | 'pearlescent'
  | 'chameleon'
  | 'special';

export type StudioViewMode = 'swatch' | 'car' | 'closeup' | 'macro' | 'sphere';

export type StudioLightingPreset = 'studio' | 'gallery' | 'sunset';

export type StudioVehicleId = 'model3' | 'modely';

export interface StudioVehicleOption {
  id: StudioVehicleId;
  name: string;
  shortName: string;
  nameEn: string;
  subtitle: string;
  subtitleEn: string;
  modelUrl: string;
  targetLength: number;
  rotationY: number;
}

export const STUDIO_VEHICLES: StudioVehicleOption[] = [
  {
    id: 'model3',
    name: 'Model 3 焕新版',
    shortName: 'Model 3',
    nameEn: 'Model 3 Highland',
    subtitle: '轿跑流线车身',
    subtitleEn: 'Sport Sedan',
    modelUrl: '/color-studio/models/tesla-model-3.glb?v=20261119',
    targetLength: 4.15,
    rotationY: 0,
  },
  {
    id: 'modely',
    name: 'Model Y 焕新版',
    shortName: 'Model Y',
    nameEn: 'Model Y Juniper',
    subtitle: 'SUV 宽体曲面',
    subtitleEn: 'SUV Fastback',
    modelUrl: '/color-studio/models/tesla-model-y.glb?v=20261119',
    targetLength: 4.25,
    rotationY: Math.PI,
  },
];

export type ColorHueGroup =
  | 'all'
  | 'neutral'
  | 'red'
  | 'gold'
  | 'green'
  | 'blue'
  | 'purple';

export interface FilmMaterialParams {
  metalness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  flakeIntensity: number;
  iridescence: number;
  iridescenceIOR: number;
  sheenIntensity: number;
}

export interface FilmOpticsMetrics {
  /** 镜面清漆光泽度 (0-100) */
  gloss: number;
  /** 金属微晶密度感 (0-100) */
  metallic: number;
  /** 折光幻彩流动度 (0-100) */
  shift: number;
}

export interface ColorFilmItem {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  finish: FilmFinishType;
  finishLabel: string;
  finishLabelEn: string;
  seriesName: string;
  seriesNameEn: string;
  hex: string;
  shiftHex?: string;
  hue: number;
  hueGroup: Exclude<ColorHueGroup, 'all'>;
  isNeutral: boolean;
  isNew?: boolean;
  tagline: string;
  taglineEn: string;
  optics: FilmOpticsMetrics;
  material: FilmMaterialParams;
}

export const AIOC_SPEC = {
  modelName: 'H&H AIOC™ 改色车衣',
  modelNameEn: 'H&H AIOC™ Color PPF',
  substrate: '脂肪族 TPU',
  substrateEn: 'Aliphatic TPU',
  thickness: '7.5±0.5 mil',
  rollSize: '1.52 × 18 m',
  warrantyYears: 5,
  features: ['AIOC™ 一体式色层', '脂肪族 TPU 基材', '划痕热修复', '抗石击保护'],
  featuresEn: ['AIOC™ integrated pigment layer', 'Aliphatic TPU base', 'Self-healing surface', 'Stone-chip protection'],
} as const;

export const LIGHTING_PRESETS: Array<{
  key: StudioLightingPreset;
  label: string;
  shortLabel: string;
  labelEn: string;
  shortLabelEn: string;
}> = [
  {
    key: 'studio',
    label: '暗夜柔光',
    shortLabel: '柔光',
    labelEn: 'Soft Atelier',
    shortLabelEn: 'Soft',
  },
  {
    key: 'gallery',
    label: '极昼展厅',
    shortLabel: '展厅',
    labelEn: 'Daylight Gallery',
    shortLabelEn: 'Gallery',
  },
  {
    key: 'sunset',
    label: '落日金辉',
    shortLabel: '落日',
    labelEn: 'Golden Sunset',
    shortLabelEn: 'Sunset',
  },
];

export const HUE_GROUPS: Array<{
  key: ColorHueGroup;
  label: string;
  labelEn: string;
  dotColor: string;
}> = [
  { key: 'all', label: '全部色系', labelEn: 'All Hues', dotColor: '#C9A86A' },
  { key: 'neutral', label: '曜石黑白灰', labelEn: 'Neutrals', dotColor: '#8D95A0' },
  { key: 'red', label: '绯红·胭脂', labelEn: 'Crimson', dotColor: '#B8333A' },
  { key: 'gold', label: '流金·竞速黄', labelEn: 'Gold & Yellow', dotColor: '#D4A84F' },
  { key: 'green', label: '翠绿·松石', labelEn: 'Emerald & Mint', dotColor: '#257B63' },
  { key: 'blue', label: '深海·蒂芙尼蓝', labelEn: 'Sapphire & Cyan', dotColor: '#199CAD' },
  { key: 'purple', label: '魅紫·樱粉', labelEn: 'Violet & Rose', dotColor: '#8A5AB8' },
];

export const FINISH_FILTERS: Array<{
  key: 'all' | FilmFinishType;
  label: string;
  labelEn: string;
}> = [
  { key: 'all', label: '全部工艺', labelEn: 'All' },
  { key: 'crystal', label: '水晶系列', labelEn: 'Crystal' },
  { key: 'metallic', label: '金属系列', labelEn: 'Metallic' },
  { key: 'pearlescent', label: '珠光系列', labelEn: 'Pearly' },
  { key: 'chameleon', label: '双色·变色龙', labelEn: 'Chameleon' },
  { key: 'special', label: '镭射·炫彩·锻碳', labelEn: 'Special' },
];

export const COLOR_STUDIO_SWATCHES: ColorFilmItem[] = [
  {
    "id": "tpu-001s",
    "code": "TPU-001S",
    "name": "天鹅白",
    "nameEn": "Gloss Swan White",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#F4F5F7",
    "shiftHex": "#FFFFFF",
    "hue": 220,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "冷白底色，亮面反射衬出车身转折。",
    "taglineEn": "A cool white gloss traces the changes in a body panel’s contours.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-002s",
    "code": "TPU-002S",
    "name": "钢琴黑",
    "nameEn": "Gloss Piano Black",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#0A0B0D",
    "shiftHex": "#22252B",
    "hue": 220,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "浓黑底色映出清晰的灯带轮廓。",
    "taglineEn": "A deep black base reflects a sharply defined strip of light.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-003s",
    "code": "TPU-003S",
    "name": "纳多灰",
    "nameEn": "Nardo Grey",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#7E8386",
    "shiftHex": "#9DA2A6",
    "hue": 203,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "低饱和中灰，亮面让棱线与弧面分明。",
    "taglineEn": "A restrained mid-grey makes panel edges stand out against smooth curves.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-004s",
    "code": "TPU-004S",
    "name": "松石绿",
    "nameEn": "Turquoise Green",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#6B9B8A",
    "shiftHex": "#8BB8A8",
    "hue": 159,
    "hueGroup": "green",
    "isNeutral": false,
    "isNew": false,
    "tagline": "柔和的松石绿带有灰青底调，受光时逐渐变浅。",
    "taglineEn": "Muted turquoise green carries a grey-teal undertone and lightens in the highlights.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-005s",
    "code": "TPU-005S",
    "name": "卡其米兰",
    "nameEn": "Milan Khaki",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#D5C9A8",
    "shiftHex": "#E6DEC6",
    "hue": 44,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "卡其与米色相融，亮面透出温暖的沙色。",
    "taglineEn": "Khaki blends into beige, with warm sand tones in the highlights.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-006s",
    "code": "TPU-006S",
    "name": "瓷器蓝",
    "nameEn": "Ceramic Blue",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#7EA1B6",
    "shiftHex": "#A1BFD0",
    "hue": 202,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "低饱和灰蓝，光泽如瓷釉般平滑。",
    "taglineEn": "A muted grey-blue with a smooth, glazed appearance.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-007s",
    "code": "TPU-007S",
    "name": "洛丽塔粉",
    "nameEn": "Lolita Pink",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#F2C2CE",
    "shiftHex": "#FADCE4",
    "hue": 345,
    "hueGroup": "red",
    "isNeutral": false,
    "isNew": false,
    "tagline": "柔和的浅玫粉在亮部透出淡粉色。",
    "taglineEn": "Soft rose pink lightens to a delicate blush in the highlights.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-008s",
    "code": "TPU-008S",
    "name": "爱马仕橙",
    "nameEn": "Hermès Orange",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#F37021",
    "shiftHex": "#FF9857",
    "hue": 23,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "浓郁暖橙，亮部依然保留鲜明的橙调。",
    "taglineEn": "A saturated warm orange that stays vivid in the highlights.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-009s",
    "code": "TPU-009S",
    "name": "紫罗兰",
    "nameEn": "Crystal Violet",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#5B3A94",
    "shiftHex": "#8162B8",
    "hue": 262,
    "hueGroup": "purple",
    "isNeutral": false,
    "isNew": false,
    "tagline": "蓝调深紫，水晶亮面映出冷紫高光。",
    "taglineEn": "A deep blue-violet with cool highlights across the gloss.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-010s",
    "code": "TPU-010S",
    "name": "云山蓝",
    "nameEn": "Crystal Sky Blue",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#6EC8E8",
    "shiftHex": "#9FDEF4",
    "hue": 196,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "清亮的天蓝带一点青调，亮部接近浅冰蓝。",
    "taglineEn": "Clear sky blue has a touch of cyan and lightens to ice blue in the highlights.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-011s",
    "code": "TPU-011S",
    "name": "法拉利红",
    "nameEn": "Ferrari Rosso Corsa",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#D40000",
    "shiftHex": "#F03A3A",
    "hue": 0,
    "hueGroup": "red",
    "isNeutral": false,
    "isNew": false,
    "tagline": "鲜明的运动正红，明暗之间保持浓郁红调。",
    "taglineEn": "A vivid racing red that holds its richness across light and shade.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-012s",
    "code": "TPU-012S",
    "name": "冰川蓝",
    "nameEn": "Glacier Blue",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#B5DCE6",
    "shiftHex": "#D4EEF5",
    "hue": 192,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "清浅的冰蓝底色在亮部接近冰白。",
    "taglineEn": "A pale glacial blue fades to an icy white highlight.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-013s",
    "code": "TPU-013S",
    "name": "纳多灰(浅)",
    "nameEn": "Light Nardo Grey",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#A4A8AB",
    "shiftHex": "#C0C4C7",
    "hue": 206,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "纳多灰的浅色版本，冷灰底色更轻盈。",
    "taglineEn": "A lighter version of Nardo Grey with a cool, understated base.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-014s",
    "code": "TPU-014S",
    "name": "甜菜根紫",
    "nameEn": "Beetroot Purple",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#8C2252",
    "shiftHex": "#B54578",
    "hue": 333,
    "hueGroup": "red",
    "isNeutral": false,
    "isNew": false,
    "tagline": "深粉与紫红相接，底色近似甜菜根。",
    "taglineEn": "Deep pink meets magenta in a rich beetroot tone.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-015s",
    "code": "TPU-015S",
    "name": "湖泊蓝",
    "nameEn": "Lake Blue",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#2EB5C4",
    "shiftHex": "#64D2DE",
    "hue": 186,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "明亮水绿色中透出青蓝，色泽清透。",
    "taglineEn": "Clear aqua sits between bright green and blue.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-016s",
    "code": "TPU-016S",
    "name": "迈阿密蓝",
    "nameEn": "Porsche Miami Blue",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#00A8C8",
    "shiftHex": "#4CCCE3",
    "hue": 190,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "饱和青蓝比天空蓝更浓，亮面层次清晰。",
    "taglineEn": "A concentrated turquoise blue with crisp glossy highlights.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-017s",
    "code": "TPU-017S",
    "name": "林地军绿",
    "nameEn": "Woodland Army Green",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#465438",
    "shiftHex": "#657556",
    "hue": 90,
    "hueGroup": "green",
    "isNeutral": false,
    "isNew": false,
    "tagline": "橄榄绿融入泥土色，阴影处更沉稳。",
    "taglineEn": "Earthy olive green grows deeper in shadow.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-025s",
    "code": "TPU-025S",
    "name": "凯莫拉灰",
    "nameEn": "Audi Kemora Grey",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#758690",
    "shiftHex": "#96A6B0",
    "hue": 202,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "灰色融入低饱和蓝调，在车身棱线上更明显。",
    "taglineEn": "A muted blue undertone shows through the grey along panel edges.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-026s",
    "code": "TPU-026S",
    "name": "布鲁克林灰",
    "nameEn": "BMW Brooklyn Grey",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#8E969B",
    "shiftHex": "#AEB5BA",
    "hue": 203,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "中性灰色微微偏蓝，受光处转为浅灰。",
    "taglineEn": "A subtle blue cast cools this grey, with lighter grey highlights.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-028s",
    "code": "TPU-028S",
    "name": "迈凯伦橙",
    "nameEn": "McLaren Papaya Orange",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#FF7A00",
    "shiftHex": "#FFA34D",
    "hue": 29,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "饱满的赛道橙在亮部透出金黄。",
    "taglineEn": "A bold racing orange turns golden where light catches the panel.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-029s",
    "code": "TPU-029S",
    "name": "能量黄",
    "nameEn": "Energy Yellow",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#F5B800",
    "shiftHex": "#FFD44D",
    "hue": 45,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "暖调明黄，向暗部逐渐过渡为琥珀色。",
    "taglineEn": "A warm, sunny yellow shades gently into amber.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-031s",
    "code": "TPU-031S",
    "name": "赛博灰绿",
    "nameEn": "Cyber Grey-Green",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#6E7A69",
    "shiftHex": "#8E9A89",
    "hue": 102,
    "hueGroup": "green",
    "isNeutral": false,
    "isNew": false,
    "tagline": "低饱和灰绿，在侧光下显出橄榄色。",
    "taglineEn": "A restrained grey-green shows an olive cast in side light.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-032s",
    "code": "TPU-032S",
    "name": "战斗绿",
    "nameEn": "Combat Green",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#4A5328",
    "shiftHex": "#6B7545",
    "hue": 73,
    "hueGroup": "green",
    "isNeutral": false,
    "isNew": false,
    "tagline": "深调军绿融入黄褐色，轮廓厚重。",
    "taglineEn": "Deep military green with an earthy ochre undertone.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-033s",
    "code": "TPU-033S",
    "name": "胡椒白",
    "nameEn": "MINI Pepper White",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#EBE5D3",
    "shiftHex": "#F7F3E8",
    "hue": 45,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "温暖的米白底色在高光中接近奶白。",
    "taglineEn": "Warm off-white turns creamy in the highlights.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-034s",
    "code": "TPU-034S",
    "name": "沙漠黄",
    "nameEn": "Desert Sand Yellow",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#B69B6A",
    "shiftHex": "#CFB88C",
    "hue": 39,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "干燥的沙土黄，暗部偏棕。",
    "taglineEn": "A dry sand yellow with brown in the shadows.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-035s",
    "code": "TPU-035S",
    "name": "总裁黑",
    "nameEn": "Executive Gloss Black",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#08090C",
    "shiftHex": "#1F2228",
    "hue": 225,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": true,
    "tagline": "近墨色的纯黑，让镜面高光格外清晰。",
    "taglineEn": "Inky black sets off the sharply reflected light.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-037s",
    "code": "TPU-037S",
    "name": "乌龙奶茶粉",
    "nameEn": "Oolong Milk Tea Pink",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#C2A2A4",
    "shiftHex": "#D9BFC1",
    "hue": 356,
    "hueGroup": "red",
    "isNeutral": false,
    "isNew": false,
    "tagline": "乌龙茶棕与柔雾粉相融，带灰调。",
    "taglineEn": "Tea brown and dusty pink meet in a muted rose tone.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-038s",
    "code": "TPU-038S",
    "name": "普罗旺斯紫",
    "nameEn": "Provence Lavender Purple",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#8673A1",
    "shiftHex": "#A896C2",
    "hue": 265,
    "hueGroup": "purple",
    "isNeutral": false,
    "isNew": false,
    "tagline": "灰紫底色近似干燥薰衣草。",
    "taglineEn": "A muted lavender-grey reminiscent of dried lavender.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-039s",
    "code": "TPU-039S",
    "name": "镜空粉",
    "nameEn": "Mirror Sky Pink",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#DFC2C8",
    "shiftHex": "#F0DCE0",
    "hue": 348,
    "hueGroup": "red",
    "isNeutral": false,
    "isNew": false,
    "tagline": "浅裸粉融入灰色，显出柔和的镜面光。",
    "taglineEn": "A pale nude pink softened by grey, with a clean gloss.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-040s",
    "code": "TPU-040S",
    "name": "贝壳粉",
    "nameEn": "Shell Pink",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#F5D2D4",
    "shiftHex": "#FCE7E8",
    "hue": 357,
    "hueGroup": "red",
    "isNeutral": false,
    "isNew": false,
    "tagline": "浅暖粉色让人想到贝壳的粉色内壁。",
    "taglineEn": "A pale, warm pink reminiscent of the inside of a shell.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-041s",
    "code": "TPU-041S",
    "name": "水晶熔岩橙",
    "nameEn": "Porsche Lava Orange",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#F2541B",
    "shiftHex": "#FF8152",
    "hue": 16,
    "hueGroup": "red",
    "isNeutral": false,
    "isNew": false,
    "tagline": "红橙色底漆在暗部转为陶土色。",
    "taglineEn": "A red-orange base shades into terracotta.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-042s",
    "code": "TPU-042S",
    "name": "迷雾灰紫",
    "nameEn": "Misty Grey-Purple",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#B8A8BE",
    "shiftHex": "#D2C6D8",
    "hue": 284,
    "hueGroup": "purple",
    "isNeutral": false,
    "isNew": false,
    "tagline": "带灰调的淡紫色，在亮部转为柔和的浅丁香紫。",
    "taglineEn": "Muted mauve softens to pale lilac in the highlights.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-044s",
    "code": "TPU-044S",
    "name": "蒂芙尼蓝",
    "nameEn": "Tiffany Blue",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#81D8D0",
    "shiftHex": "#ACEAE4",
    "hue": 174,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "明亮的薄荷蓝绿，亮面带浅色高光。",
    "taglineEn": "Light mint turquoise with pale, glossy highlights.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-045s",
    "code": "TPU-045S",
    "name": "圣保罗黄",
    "nameEn": "BMW Sao Paulo Yellow",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#DCE32D",
    "shiftHex": "#ECF16B",
    "hue": 62,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "鲜黄中带青柠绿，在光照下尤为醒目。",
    "taglineEn": "Brilliant yellow carries a distinct lime-green edge.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-046s",
    "code": "TPU-046S",
    "name": "阿什利绿",
    "nameEn": "Ashley Green",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#5D8B62",
    "shiftHex": "#7FA984",
    "hue": 127,
    "hueGroup": "green",
    "isNeutral": false,
    "isNew": false,
    "tagline": "带暖意的草绿色，受光处显出柔和黄绿。",
    "taglineEn": "A warm grass green with yellow-green highlights.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-048s",
    "code": "TPU-048S",
    "name": "保时捷亚灰",
    "nameEn": "Porsche Chalk Grey",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#D2CFC8",
    "shiftHex": "#E5E3DD",
    "hue": 42,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "柔和的浅暖灰，色调接近粉笔灰。",
    "taglineEn": "A gently warm, chalk-like grey with low saturation.",
    "optics": {
      "gloss": 98,
      "metallic": 10,
      "shift": 16
    },
    "material": {
      "metalness": 0.06,
      "roughness": 0.06,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.02,
      "iridescence": 0.08,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.16
    }
  },
  {
    "id": "tpu-049s",
    "code": "TPU-049S",
    "name": "超哑碳黑",
    "nameEn": "Ultra-Matte Carbon Black",
    "finish": "crystal",
    "finishLabel": "水晶",
    "finishLabelEn": "Crystal",
    "seriesName": "水晶 Sole",
    "seriesNameEn": "Sole Crystal",
    "hex": "#1A1B1E",
    "shiftHex": "#32353B",
    "hue": 225,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "碳黑表面分散反光，明暗交界柔和。",
    "taglineEn": "Carbon black diffuses the light into soft, matte transitions.",
    "optics": {
      "gloss": 28,
      "metallic": 22,
      "shift": 12
    },
    "material": {
      "metalness": 0.14,
      "roughness": 0.44,
      "clearcoat": 0.25,
      "clearcoatRoughness": 0.42,
      "flakeIntensity": 0.08,
      "iridescence": 0.04,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.22
    }
  },
  {
    "id": "tpu-001m",
    "code": "TPU-001M",
    "name": "黑金AMG山灰",
    "nameEn": "Black Gold AMG Mountain Grey",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#4F5356",
    "shiftHex": "#8C8470",
    "hue": 206,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "深石墨灰的阴影与柔和的金色反光相衬。",
    "taglineEn": "Dark graphite-grey shadows contrast with a muted gold reflection.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-002m",
    "code": "TPU-002M",
    "name": "黑曜金",
    "nameEn": "Metallic Obsidian Gold",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#2B261B",
    "shiftHex": "#A88B4A",
    "hue": 41,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "近黑的棕金底色在受光处浮现深金色。",
    "taglineEn": "A near-black bronze base reveals deep gold in the light.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-003m",
    "code": "TPU-003M",
    "name": "GT银",
    "nameEn": "Porsche GT Silver Metallic",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#B6BAC0",
    "shiftHex": "#DCE0E6",
    "hue": 216,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "明亮中性银色，细密金属颗粒映出光带。",
    "taglineEn": "Fine metallic grain draws a bright band across neutral silver.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-004m",
    "code": "TPU-004M",
    "name": "骑士银",
    "nameEn": "Metallic Knight Silver",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#9BA1A8",
    "shiftHex": "#C2C7CE",
    "hue": 212,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "偏冷的银色在曲面上形成宽阔柔光。",
    "taglineEn": "Cool silver stretches into broad highlights across a curved panel.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-005m",
    "code": "TPU-005M",
    "name": "金属枪灰",
    "nameEn": "Metallic Gunmetal Gray",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#4A4F56",
    "shiftHex": "#787E87",
    "hue": 215,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "深枪灰色底漆在亮部显出冷调金属光。",
    "taglineEn": "Deep gunmetal grey catches cool metallic highlights.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-006m",
    "code": "TPU-006M",
    "name": "冰莓粉",
    "nameEn": "Porsche Frozen Berry Metallic",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#B98B95",
    "shiftHex": "#D6B0B9",
    "hue": 347,
    "hueGroup": "red",
    "isNeutral": false,
    "isNew": false,
    "tagline": "柔和的莓粉色在亮部泛出浅玫色金属光。",
    "taglineEn": "Muted berry pink catches a pale rose metallic reflection.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-007m",
    "code": "TPU-007M",
    "name": "天青蓝",
    "nameEn": "Metallic Azure Blue",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#5D89A8",
    "shiftHex": "#8AB2CE",
    "hue": 205,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "中等深度的灰蓝色在受光处转为明亮浅蓝。",
    "taglineEn": "A medium blue-grey brightens to a lighter blue in the highlights.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-008m",
    "code": "TPU-008M",
    "name": "阳光橙",
    "nameEn": "Metallic Sunny Orange",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#E8741C",
    "shiftHex": "#FFA052",
    "hue": 26,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "鲜明的暖橙色随金属光带过渡为浅橙。",
    "taglineEn": "Vivid warm orange turns lighter across the metallic highlight.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-009m",
    "code": "TPU-009M",
    "name": "熔岩橙",
    "nameEn": "Metallic Lava Orange",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#E84C1E",
    "shiftHex": "#FF7D54",
    "hue": 14,
    "hueGroup": "red",
    "isNeutral": false,
    "isNew": false,
    "tagline": "暖红橙色的金属光泽在曲面上展开。",
    "taglineEn": "Warm red-orange carries metallic reflections across curved panels.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-010m",
    "code": "TPU-010M",
    "name": "天鹅绒紫",
    "nameEn": "Metallic Velvet Purple",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#5C3468",
    "shiftHex": "#8A5D96",
    "hue": 286,
    "hueGroup": "purple",
    "isNeutral": false,
    "isNew": false,
    "tagline": "深紫底色泛出较明亮的紫红色金属光。",
    "taglineEn": "Deep violet catches a brighter plum-coloured metallic sheen.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-011m",
    "code": "TPU-011M",
    "name": "古铜金",
    "nameEn": "Metallic Bronze Gold",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#8C6239",
    "shiftHex": "#BA9064",
    "hue": 30,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "浓郁铜棕底色在亮部呈现古铜金光。",
    "taglineEn": "The rich copper-brown base catches a bronze-gold sheen.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-012m",
    "code": "TPU-012M",
    "name": "超音速钛灰",
    "nameEn": "Sonic Titanium Grey",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#8A8D8F",
    "shiftHex": "#B5B8BA",
    "hue": 204,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "中性钛灰色带有偏冷的银色反光。",
    "taglineEn": "Neutral titanium grey carries a cool silver reflection.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-013m",
    "code": "TPU-013M",
    "name": "AMG 超哑山灰",
    "nameEn": "AMG Selenite Grey Magno",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#5A5E62",
    "shiftHex": "#7C8186",
    "hue": 210,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "山灰色的哑光表面使反光更柔和。",
    "taglineEn": "A matte mountain grey softens the reflected light.",
    "optics": {
      "gloss": 28,
      "metallic": 64,
      "shift": 12
    },
    "material": {
      "metalness": 0.58,
      "roughness": 0.44,
      "clearcoat": 0.25,
      "clearcoatRoughness": 0.42,
      "flakeIntensity": 0.34,
      "iridescence": 0.04,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.22
    }
  },
  {
    "id": "tpu-014m",
    "code": "TPU-014M",
    "name": "超哑黑矿石",
    "nameEn": "Super Matte Obsidian Black",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#1C1E21",
    "shiftHex": "#383B42",
    "hue": 216,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "矿石般的深灰黑色，表面高光柔和。",
    "taglineEn": "A deep mineral charcoal with a diffuse matte highlight.",
    "optics": {
      "gloss": 28,
      "metallic": 64,
      "shift": 12
    },
    "material": {
      "metalness": 0.58,
      "roughness": 0.44,
      "clearcoat": 0.25,
      "clearcoatRoughness": 0.42,
      "flakeIntensity": 0.34,
      "iridescence": 0.04,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.22
    }
  },
  {
    "id": "tpu-015m",
    "code": "TPU-015M",
    "name": "哑光铝水银",
    "nameEn": "Matte Aluminum Mercury",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#AEB3B8",
    "shiftHex": "#D0D4D8",
    "hue": 210,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "浅银色呈哑光质感，光带宽而柔和。",
    "taglineEn": "Pale matte silver spreads the light into broad, soft bands.",
    "optics": {
      "gloss": 28,
      "metallic": 64,
      "shift": 12
    },
    "material": {
      "metalness": 0.58,
      "roughness": 0.44,
      "clearcoat": 0.25,
      "clearcoatRoughness": 0.42,
      "flakeIntensity": 0.34,
      "iridescence": 0.04,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.22
    }
  },
  {
    "id": "tpu-016m",
    "code": "TPU-016M",
    "name": "液态银",
    "nameEn": "Liquid Silver Metallic",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#C2C6CC",
    "shiftHex": "#E5E8ED",
    "hue": 216,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "银灰色沿曲面明暗流动，反光接近液态金属。",
    "taglineEn": "Light flows across silver-grey curves like liquid metal.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-019m",
    "code": "TPU-019M",
    "name": "丝缎AMG山灰",
    "nameEn": "Satin AMG Mountain Grey",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#565A5E",
    "shiftHex": "#7A7F85",
    "hue": 210,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "中灰色的丝缎光泽沿棱线展开。",
    "taglineEn": "A satin sheen traces the edges of this mid-grey finish.",
    "optics": {
      "gloss": 62,
      "metallic": 76,
      "shift": 28
    },
    "material": {
      "metalness": 0.68,
      "roughness": 0.26,
      "clearcoat": 0.62,
      "clearcoatRoughness": 0.22,
      "flakeIntensity": 0.42,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.35
    }
  },
  {
    "id": "tpu-020m",
    "code": "TPU-020M",
    "name": "丝缎哑黑矿石",
    "nameEn": "Satin Matte Black",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#222428",
    "shiftHex": "#3F434A",
    "hue": 220,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "深灰矿石色带柔和的缎面侧光。",
    "taglineEn": "Deep mineral grey with a soft satin reflection in side light.",
    "optics": {
      "gloss": 62,
      "metallic": 76,
      "shift": 28
    },
    "material": {
      "metalness": 0.68,
      "roughness": 0.26,
      "clearcoat": 0.62,
      "clearcoatRoughness": 0.22,
      "flakeIntensity": 0.42,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.35
    }
  },
  {
    "id": "tpu-021m",
    "code": "TPU-021M",
    "name": "索马托蓝",
    "nameEn": "Somato Metallic Blue",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#587A96",
    "shiftHex": "#83A5C0",
    "hue": 207,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "偏冷的灰蓝色在金属高光中转为浅蓝。",
    "taglineEn": "Cool grey-blue turns pale blue along the metallic highlight.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-022m",
    "code": "TPU-022M",
    "name": "曙光金",
    "nameEn": "Dawning Gold Metallic",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#C9B082",
    "shiftHex": "#E2CFA8",
    "hue": 39,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "淡金色接近浅香槟色，光泽平缓。",
    "taglineEn": "Pale gold approaches champagne in the soft highlights.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-026m",
    "code": "TPU-026M",
    "name": "金属香槟金",
    "nameEn": "Metallic Champagne Gold",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#C2AD84",
    "shiftHex": "#DECBA6",
    "hue": 40,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": true,
    "tagline": "香槟金的暖调底色带细密金属光。",
    "taglineEn": "Warm champagne gold with a fine metallic shimmer.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-027m",
    "code": "TPU-027M",
    "name": "丝缎金属香槟金",
    "nameEn": "Satin Champagne Gold",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#CBB892",
    "shiftHex": "#E3D4B4",
    "hue": 40,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": true,
    "tagline": "浅香槟金配以柔和的缎面反射。",
    "taglineEn": "Pale champagne gold with broad, satin reflections.",
    "optics": {
      "gloss": 62,
      "metallic": 76,
      "shift": 28
    },
    "material": {
      "metalness": 0.68,
      "roughness": 0.26,
      "clearcoat": 0.62,
      "clearcoatRoughness": 0.22,
      "flakeIntensity": 0.42,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.35
    }
  },
  {
    "id": "tpu-029m",
    "code": "TPU-029M",
    "name": "流光金",
    "nameEn": "Flowing Gold Metallic",
    "finish": "metallic",
    "finishLabel": "金属",
    "finishLabelEn": "Metallic",
    "seriesName": "金属 Metal",
    "seriesNameEn": "Metal Series",
    "hex": "#B8965A",
    "shiftHex": "#D6B87E",
    "hue": 38,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": true,
    "tagline": "偏棕的柔金色随光线显出明暗层次。",
    "taglineEn": "A soft brown-gold gains definition as the light moves.",
    "optics": {
      "gloss": 92,
      "metallic": 92,
      "shift": 34
    },
    "material": {
      "metalness": 0.8,
      "roughness": 0.16,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.04,
      "flakeIntensity": 0.62,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.34
    }
  },
  {
    "id": "tpu-001p",
    "code": "TPU-001P",
    "name": "朱雀红",
    "nameEn": "Pearlescent Rosefinch Red",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#A3444B",
    "shiftHex": "#A04148",
    "hue": 356,
    "hueGroup": "red",
    "isNeutral": false,
    "isNew": false,
    "tagline": "深红底色泛起细密玫红珠光。",
    "taglineEn": "Fine rose-red pearl emerges from a deep red base.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-002p",
    "code": "TPU-002P",
    "name": "珍珠白",
    "nameEn": "Pearl White",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#DEE3DC",
    "shiftHex": "#E2E6E2",
    "hue": 103,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "近白的底色在侧光中透出柔和珠光。",
    "taglineEn": "Soft pearl shows in side light on a near-white base.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-003p",
    "code": "TPU-003P",
    "name": "祖母绿",
    "nameEn": "Pearlescent Emerald Green",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#264C40",
    "shiftHex": "#437163",
    "hue": 161,
    "hueGroup": "green",
    "isNeutral": false,
    "isNew": false,
    "tagline": "深绿近似祖母绿，亮部呈清冷珠光。",
    "taglineEn": "Deep emerald green catches cool pearlescent highlights.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-004p",
    "code": "TPU-004P",
    "name": "珠光黑",
    "nameEn": "Pearlescent Black",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#37383A",
    "shiftHex": "#333739",
    "hue": 220,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "深炭黑上显出细密的银色珠光。",
    "taglineEn": "A fine silver pearl appears over the dark charcoal base.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-005p",
    "code": "TPU-005P",
    "name": "火焰绿",
    "nameEn": "Pearlescent Flame Green",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#138E5F",
    "shiftHex": "#0E9B58",
    "hue": 157,
    "hueGroup": "green",
    "isNeutral": false,
    "isNew": false,
    "tagline": "翠绿珠光在深绿底色上尤其明亮。",
    "taglineEn": "Bright green pearl catches the light above a deep green base.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-006p",
    "code": "TPU-006P",
    "name": "千山翠",
    "nameEn": "Pearlescent Mountain Green",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#21534D",
    "shiftHex": "#1C605B",
    "hue": 173,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "深青绿在曲面亮部显出明亮翡翠色。",
    "taglineEn": "Dark teal takes on a brighter jade tone in the highlights.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-007p",
    "code": "TPU-007P",
    "name": "激情黄",
    "nameEn": "Pearlescent Passion Yellow",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#F6E107",
    "shiftHex": "#F5DE0F",
    "hue": 55,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "饱和明黄的受光面带有金色珠光。",
    "taglineEn": "Saturated yellow shows a golden pearl on the lit surface.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-008p",
    "code": "TPU-008P",
    "name": "葡萄紫",
    "nameEn": "Pearlescent Grape Purple",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#743F6E",
    "shiftHex": "#AF71A0",
    "hue": 307,
    "hueGroup": "purple",
    "isNeutral": false,
    "isNew": false,
    "tagline": "深葡萄紫在侧光中泛出莓色珠光。",
    "taglineEn": "Deep grape purple reveals a berry-coloured pearl in side light.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-009p",
    "code": "TPU-009P",
    "name": "激情蓝",
    "nameEn": "Pearlescent Passion Blue",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#2A3B81",
    "shiftHex": "#668BD8",
    "hue": 228,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "深蓝底色在亮部显出清晰的钴蓝。",
    "taglineEn": "A deep blue base opens to clear cobalt in the highlights.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-011p",
    "code": "TPU-011P",
    "name": "哑光象牙瓷白",
    "nameEn": "Satin Ivory White",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#DDDFD9",
    "shiftHex": "#DEDED9",
    "hue": 80,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "暖象牙白的哑光表面柔和地分散反光。",
    "taglineEn": "Matte ivory softens and spreads the light across its warm base.",
    "optics": {
      "gloss": 28,
      "metallic": 22,
      "shift": 24
    },
    "material": {
      "metalness": 0.28,
      "roughness": 0.44,
      "clearcoat": 0.25,
      "clearcoatRoughness": 0.42,
      "flakeIntensity": 0.34,
      "iridescence": 0.16,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.22
    }
  },
  {
    "id": "tpu-012p",
    "code": "TPU-012P",
    "name": "象牙白",
    "nameEn": "Gloss Ivory White",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#E2E4E3",
    "shiftHex": "#EEEFEC",
    "hue": 150,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "温润象牙白在强光处带柔和珍珠光。",
    "taglineEn": "Warm ivory gives a soft pearl reflection under stronger light.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-021p",
    "code": "TPU-021P",
    "name": "哑光曙光白",
    "nameEn": "Matte Dawn White",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#E0E4E1",
    "shiftHex": "#DCE9DD",
    "hue": 135,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "浅白色带轻微幻彩，哑光反射平缓。",
    "taglineEn": "A pale white with subtle iridescence and a soft matte reflection.",
    "optics": {
      "gloss": 28,
      "metallic": 22,
      "shift": 24
    },
    "material": {
      "metalness": 0.28,
      "roughness": 0.44,
      "clearcoat": 0.25,
      "clearcoatRoughness": 0.42,
      "flakeIntensity": 0.34,
      "iridescence": 0.16,
      "iridescenceIOR": 1.32,
      "sheenIntensity": 0.22
    }
  },
  {
    "id": "tpu-025p",
    "code": "TPU-025P",
    "name": "安哥拉灰",
    "nameEn": "Angora Grey",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#E2E4DA",
    "shiftHex": "#EAEBE3",
    "hue": 72,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "浅奶灰带有暖色底调，珠光细腻。",
    "taglineEn": "A creamy light grey with warm undertones and delicate pearl.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-026p",
    "code": "TPU-026P",
    "name": "暗影蓝",
    "nameEn": "Shadow Blue",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#296277",
    "shiftHex": "#3B8C9F",
    "hue": 196,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "深青蓝底色由暗处蓝灰转向亮处水蓝。",
    "taglineEn": "Deep teal moves from blue-grey shadow into aqua highlights.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-027p",
    "code": "TPU-027P",
    "name": "齐紫",
    "nameEn": "Shadow Purple",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#594E5C",
    "shiftHex": "#938895",
    "hue": 287,
    "hueGroup": "purple",
    "isNeutral": false,
    "isNew": false,
    "tagline": "低调的暗紫底色在侧光下透出冷紫。",
    "taglineEn": "A muted dark purple reveals a cooler violet pearl in side light.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-028p",
    "code": "TPU-028P",
    "name": "龙血红",
    "nameEn": "Dragon Blood Red",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#843D43",
    "shiftHex": "#D55763",
    "hue": 355,
    "hueGroup": "red",
    "isNeutral": false,
    "isNew": false,
    "tagline": "暗红底色受光后显出更鲜明的深红。",
    "taglineEn": "A dark red base brightens to a rich ruby red under light.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-029p",
    "code": "TPU-029P",
    "name": "黑玫瑰",
    "nameEn": "Pearlescent Black Rose",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#51373A",
    "shiftHex": "#815E62",
    "hue": 353,
    "hueGroup": "red",
    "isNeutral": false,
    "isNew": false,
    "tagline": "暗处近黑，直射光下透出深玫红。",
    "taglineEn": "Nearly black in shadow, this shade reveals deep rose in direct light.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-031p",
    "code": "TPU-031P",
    "name": "赛博灰",
    "nameEn": "Cyber Grey",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#4B4D4A",
    "shiftHex": "#5E6160",
    "hue": 100,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "深灰底色在侧光下泛出冷色珠光。",
    "taglineEn": "Cool pearl glints appear over a dark grey base.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-033p",
    "code": "TPU-033P",
    "name": "皇家绿",
    "nameEn": "Royal Green",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#224A3B",
    "shiftHex": "#226749",
    "hue": 158,
    "hueGroup": "green",
    "isNeutral": false,
    "isNew": false,
    "tagline": "墨玉般的深绿在强光处泛出翠色。",
    "taglineEn": "A dark jade green takes on a brighter emerald glow in direct light.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-034p",
    "code": "TPU-034P",
    "name": "奥格黄",
    "nameEn": "August Yellow",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#EDC512",
    "shiftHex": "#F9DF5F",
    "hue": 49,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "金黄底色配细腻柔和的珠光。",
    "taglineEn": "A golden yellow with a soft, fine pearl sheen.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-035p",
    "code": "TPU-035P",
    "name": "竞速橙",
    "nameEn": "Racing Orange",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#E39327",
    "shiftHex": "#EDA84F",
    "hue": 34,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "饱和的暖橙色在受光面泛出金橙色。",
    "taglineEn": "Saturated warm orange turns golden orange in the highlights.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-039p",
    "code": "TPU-039P",
    "name": "琉璃蓝",
    "nameEn": "Glazed Blue",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#184FBB",
    "shiftHex": "#2E4DB1",
    "hue": 220,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "宝石蓝底色随角度转为更明亮的钴蓝。",
    "taglineEn": "A sapphire-blue base reveals brighter cobalt at an angle.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-040p",
    "code": "TPU-040P",
    "name": "金属锰石黑",
    "nameEn": "Metallic Manganese Black",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#2C2E2C",
    "shiftHex": "#3E4140",
    "hue": 120,
    "hueGroup": "green",
    "isNeutral": false,
    "isNew": false,
    "tagline": "接近黑色的深炭灰带细微金属珠光。",
    "taglineEn": "Near-black charcoal with a restrained metallic pearl.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-041p",
    "code": "TPU-041P",
    "name": "玛瑙绿",
    "nameEn": "Agate Green",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#126245",
    "shiftHex": "#3D8769",
    "hue": 158,
    "hueGroup": "green",
    "isNeutral": false,
    "isNew": false,
    "tagline": "浓郁深绿带有细腻珠光，亮部偏翡翠色。",
    "taglineEn": "Rich dark green carries fine pearl with jade highlights.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-043p",
    "code": "TPU-043P",
    "name": "威尼斯紫",
    "nameEn": "Venetian Purple",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#522673",
    "shiftHex": "#8654A6",
    "hue": 274,
    "hueGroup": "purple",
    "isNeutral": false,
    "isNew": false,
    "tagline": "暗紫底色在光带中显出较亮的紫罗兰色。",
    "taglineEn": "Violet highlights emerge from a dark purple base.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-044p",
    "code": "TPU-044P",
    "name": "金属灰绿",
    "nameEn": "Metallic Grey-Green",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#6D7466",
    "shiftHex": "#A4A99A",
    "hue": 90,
    "hueGroup": "green",
    "isNeutral": false,
    "isNew": false,
    "tagline": "低饱和灰绿随光线浮现细密的冷色珠光。",
    "taglineEn": "A muted grey-green reveals fine, cool pearl as light moves.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-048p",
    "code": "TPU-048P",
    "name": "星云紫",
    "nameEn": "Nebula Purple",
    "finish": "pearlescent",
    "finishLabel": "珠光",
    "finishLabelEn": "Pearlescent",
    "seriesName": "珠光 Pearly",
    "seriesNameEn": "Pearly Series",
    "hex": "#7857A9",
    "shiftHex": "#AB78D5",
    "hue": 264,
    "hueGroup": "purple",
    "isNeutral": false,
    "isNew": true,
    "tagline": "星云般的紫色珠光从深紫过渡到亮紫。",
    "taglineEn": "Nebula-like pearl moves from deep violet into brighter lilac.",
    "optics": {
      "gloss": 96,
      "metallic": 46,
      "shift": 82
    },
    "material": {
      "metalness": 0.32,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.36,
      "iridescence": 0.62,
      "iridescenceIOR": 1.46,
      "sheenIntensity": 0.72
    }
  },
  {
    "id": "tpu-001b",
    "code": "TPU-001B",
    "name": "梦幻火山灰",
    "nameEn": "Fantasy Volcanic Ash",
    "finish": "chameleon",
    "finishLabel": "双色",
    "finishLabelEn": "Bicolor",
    "seriesName": "双色 Bicolor",
    "seriesNameEn": "Bicolor Series",
    "hex": "#C9AEAD",
    "shiftHex": "#C3ACAE",
    "hue": 2,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "浅灰底色带烟粉色反光，明暗面色调不同。",
    "taglineEn": "A pale grey base takes on smoky pink reflections at an angle.",
    "optics": {
      "gloss": 96,
      "metallic": 56,
      "shift": 95
    },
    "material": {
      "metalness": 0.42,
      "roughness": 0.1,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.022,
      "flakeIntensity": 0.48,
      "iridescence": 0.88,
      "iridescenceIOR": 1.56,
      "sheenIntensity": 0.88
    }
  },
  {
    "id": "tpu-002b",
    "code": "TPU-002B",
    "name": "妃子笑",
    "nameEn": "Red in White",
    "finish": "chameleon",
    "finishLabel": "双色",
    "finishLabelEn": "Bicolor",
    "seriesName": "双色 Bicolor",
    "seriesNameEn": "Bicolor Series",
    "hex": "#E0D8D3",
    "shiftHex": "#E8DFDC",
    "hue": 23,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "浅白底色随转角泛出含蓄的粉红。",
    "taglineEn": "Pale white catches a subtle pink blush when viewed at an angle.",
    "optics": {
      "gloss": 96,
      "metallic": 56,
      "shift": 95
    },
    "material": {
      "metalness": 0.42,
      "roughness": 0.1,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.022,
      "flakeIntensity": 0.48,
      "iridescence": 0.88,
      "iridescenceIOR": 1.56,
      "sheenIntensity": 0.88
    }
  },
  {
    "id": "tpu-001l",
    "code": "TPU-001L",
    "name": "高光镭射白",
    "nameEn": "Gloss Laser White",
    "finish": "special",
    "finishLabel": "镭射",
    "finishLabelEn": "Laser",
    "seriesName": "镭射 Laser",
    "seriesNameEn": "Laser Series",
    "hex": "#D3D6CF",
    "shiftHex": "#DEE2DE",
    "hue": 86,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "白色底膜在直射光下显出细微彩色闪点。",
    "taglineEn": "Fine multicoloured glints appear on white under direct light.",
    "optics": {
      "gloss": 96,
      "metallic": 68,
      "shift": 90
    },
    "material": {
      "metalness": 0.52,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.58,
      "iridescence": 0.82,
      "iridescenceIOR": 1.52,
      "sheenIntensity": 0.82
    }
  },
  {
    "id": "tpu-002l",
    "code": "TPU-002L",
    "name": "镭射黑",
    "nameEn": "Laser Black",
    "finish": "special",
    "finishLabel": "镭射",
    "finishLabelEn": "Laser",
    "seriesName": "镭射 Laser",
    "seriesNameEn": "Laser Series",
    "hex": "#242724",
    "shiftHex": "#5F6160",
    "hue": 120,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "深黑底色在强光处映出细小彩色闪点。",
    "taglineEn": "Small spectral glints stand out against black in strong light.",
    "optics": {
      "gloss": 96,
      "metallic": 68,
      "shift": 90
    },
    "material": {
      "metalness": 0.52,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.58,
      "iridescence": 0.82,
      "iridescenceIOR": 1.52,
      "sheenIntensity": 0.82
    }
  },
  {
    "id": "tpu-001c",
    "code": "TPU-001C",
    "name": "黑魅红",
    "nameEn": "Aurora Black Charm Red",
    "finish": "chameleon",
    "finishLabel": "变色龙",
    "finishLabelEn": "Chameleon",
    "seriesName": "变色龙 Chameleon",
    "seriesNameEn": "Chameleon Series",
    "hex": "#683232",
    "shiftHex": "#795E5F",
    "hue": 0,
    "hueGroup": "red",
    "isNeutral": false,
    "isNew": false,
    "tagline": "阴影中接近黑色，受光处转为酒红。",
    "taglineEn": "Near-black shadows give way to burgundy in the light.",
    "optics": {
      "gloss": 96,
      "metallic": 56,
      "shift": 95
    },
    "material": {
      "metalness": 0.42,
      "roughness": 0.1,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.022,
      "flakeIntensity": 0.48,
      "iridescence": 0.88,
      "iridescenceIOR": 1.56,
      "sheenIntensity": 0.88
    }
  },
  {
    "id": "tpu-002c",
    "code": "TPU-002C",
    "name": "青魔",
    "nameEn": "Aurora Green",
    "finish": "chameleon",
    "finishLabel": "变色龙",
    "finishLabelEn": "Chameleon",
    "seriesName": "变色龙 Chameleon",
    "seriesNameEn": "Chameleon Series",
    "hex": "#0DBEA4",
    "shiftHex": "#4ED29C",
    "hue": 171,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "翠绿与蓝绿随观察角度相互转变。",
    "taglineEn": "Emerald and turquoise trade places as the viewing angle changes.",
    "optics": {
      "gloss": 96,
      "metallic": 56,
      "shift": 95
    },
    "material": {
      "metalness": 0.42,
      "roughness": 0.1,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.022,
      "flakeIntensity": 0.48,
      "iridescence": 0.88,
      "iridescenceIOR": 1.56,
      "sheenIntensity": 0.88
    }
  },
  {
    "id": "tpu-003c",
    "code": "TPU-003C",
    "name": "青岭苍岚",
    "nameEn": "Aurora Blue-Green",
    "finish": "chameleon",
    "finishLabel": "变色龙",
    "finishLabelEn": "Chameleon",
    "seriesName": "变色龙 Chameleon",
    "seriesNameEn": "Chameleon Series",
    "hex": "#199CAD",
    "shiftHex": "#50A6A1",
    "hue": 187,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "墨青绿在转角处透出湖蓝色。",
    "taglineEn": "Dark blue-green opens into lake blue along curved surfaces.",
    "optics": {
      "gloss": 96,
      "metallic": 56,
      "shift": 95
    },
    "material": {
      "metalness": 0.42,
      "roughness": 0.1,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.022,
      "flakeIntensity": 0.48,
      "iridescence": 0.88,
      "iridescenceIOR": 1.56,
      "sheenIntensity": 0.88
    }
  },
  {
    "id": "tpu-005c",
    "code": "TPU-005C",
    "name": "高亮喀纳斯蓝",
    "nameEn": "Gloss Kanas Blue",
    "finish": "chameleon",
    "finishLabel": "变色龙",
    "finishLabelEn": "Chameleon",
    "seriesName": "变色龙 Chameleon",
    "seriesNameEn": "Chameleon Series",
    "hex": "#35479B",
    "shiftHex": "#3A8DE1",
    "hue": 229,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": true,
    "tagline": "青、蓝、紫沿高光曲面依次浮现。",
    "taglineEn": "Teal, blue and violet emerge in turn across the glossy curve.",
    "optics": {
      "gloss": 96,
      "metallic": 56,
      "shift": 95
    },
    "material": {
      "metalness": 0.42,
      "roughness": 0.1,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.022,
      "flakeIntensity": 0.48,
      "iridescence": 0.88,
      "iridescenceIOR": 1.56,
      "sheenIntensity": 0.88
    }
  },
  {
    "id": "tpu-006c",
    "code": "TPU-006C",
    "name": "丝缎喀纳斯蓝",
    "nameEn": "Satin Kanas Blue",
    "finish": "chameleon",
    "finishLabel": "变色龙",
    "finishLabelEn": "Chameleon",
    "seriesName": "变色龙 Chameleon",
    "seriesNameEn": "Chameleon Series",
    "hex": "#45629C",
    "shiftHex": "#3D6DC6",
    "hue": 220,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": true,
    "tagline": "缎光使青蓝至紫色的过渡更柔和。",
    "taglineEn": "A satin surface softens the transition from teal-blue into violet.",
    "optics": {
      "gloss": 62,
      "metallic": 42,
      "shift": 48
    },
    "material": {
      "metalness": 0.36,
      "roughness": 0.26,
      "clearcoat": 0.62,
      "clearcoatRoughness": 0.22,
      "flakeIntensity": 0.42,
      "iridescence": 0.32,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.35
    }
  },
  {
    "id": "tpu-002a",
    "code": "TPU-002A",
    "name": "丝缎旭日金",
    "nameEn": "Satin Sunrise Gold",
    "finish": "special",
    "finishLabel": "合金",
    "finishLabelEn": "Alloyed",
    "seriesName": "合金 Alloyed",
    "seriesNameEn": "Alloyed Metal",
    "hex": "#DFCE63",
    "shiftHex": "#EBD86B",
    "hue": 52,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": true,
    "tagline": "晨光般的浅金色搭配柔和的缎面反光。",
    "taglineEn": "A pale sunrise gold with a softly diffused satin highlight.",
    "optics": {
      "gloss": 62,
      "metallic": 76,
      "shift": 28
    },
    "material": {
      "metalness": 0.68,
      "roughness": 0.26,
      "clearcoat": 0.62,
      "clearcoatRoughness": 0.22,
      "flakeIntensity": 0.42,
      "iridescence": 0.16,
      "iridescenceIOR": 1.38,
      "sheenIntensity": 0.35
    }
  },
  {
    "id": "tpu-001g",
    "code": "TPU-001G",
    "name": "炫彩时光金",
    "nameEn": "Iridescent Golden Armour",
    "finish": "special",
    "finishLabel": "炫彩",
    "finishLabelEn": "Gorgeous",
    "seriesName": "炫彩 Gorgeous",
    "seriesNameEn": "Gorgeous Series",
    "hex": "#8E8B59",
    "shiftHex": "#A09E78",
    "hue": 57,
    "hueGroup": "gold",
    "isNeutral": false,
    "isNew": false,
    "tagline": "金色闪粉随光线浮现，底色影响最终观感。",
    "taglineEn": "Golden shimmer emerges in the light, with the underlying colour influencing its appearance.",
    "optics": {
      "gloss": 96,
      "metallic": 68,
      "shift": 90
    },
    "material": {
      "metalness": 0.52,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.58,
      "iridescence": 0.82,
      "iridescenceIOR": 1.52,
      "sheenIntensity": 0.82
    }
  },
  {
    "id": "tpu-002g",
    "code": "TPU-002G",
    "name": "炫彩金钻白",
    "nameEn": "Iridescent Gold Diamond White",
    "finish": "special",
    "finishLabel": "炫彩",
    "finishLabelEn": "Gorgeous",
    "seriesName": "炫彩 Gorgeous",
    "seriesNameEn": "Gorgeous Series",
    "hex": "#E7ECEB",
    "shiftHex": "#E8EDEB",
    "hue": 168,
    "hueGroup": "blue",
    "isNeutral": false,
    "isNew": false,
    "tagline": "清透白色在亮部透出细微金色闪光。",
    "taglineEn": "Clear white carries a fine golden sparkle in the highlights.",
    "optics": {
      "gloss": 96,
      "metallic": 68,
      "shift": 90
    },
    "material": {
      "metalness": 0.52,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.58,
      "iridescence": 0.82,
      "iridescenceIOR": 1.52,
      "sheenIntensity": 0.82
    }
  },
  {
    "id": "tpu-003g",
    "code": "TPU-003G",
    "name": "炫彩蓝钻白",
    "nameEn": "Iridescent Blue Diamond White",
    "finish": "special",
    "finishLabel": "炫彩",
    "finishLabelEn": "Gorgeous",
    "seriesName": "炫彩 Gorgeous",
    "seriesNameEn": "Gorgeous Series",
    "hex": "#DDE3DE",
    "shiftHex": "#DBE0DE",
    "hue": 130,
    "hueGroup": "green",
    "isNeutral": false,
    "isNew": false,
    "tagline": "白色底调在强光下透出冰蓝细闪。",
    "taglineEn": "A white base shows a fine ice-blue sparkle in stronger light.",
    "optics": {
      "gloss": 96,
      "metallic": 68,
      "shift": 90
    },
    "material": {
      "metalness": 0.52,
      "roughness": 0.11,
      "clearcoat": 1.0,
      "clearcoatRoughness": 0.025,
      "flakeIntensity": 0.58,
      "iridescence": 0.82,
      "iridescenceIOR": 1.52,
      "sheenIntensity": 0.82
    }
  },
  {
    "id": "tpu-001fp",
    "code": "TPU-001FP",
    "name": "幽冥黑",
    "nameEn": "Nether Black",
    "finish": "special",
    "finishLabel": "锻碳",
    "finishLabelEn": "Forged Carbon",
    "seriesName": "锻碳 Forged",
    "seriesNameEn": "Forged Carbon",
    "hex": "#1B1C20",
    "shiftHex": "#484B52",
    "hue": 100,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "深灰黑底色上铺开不规则的流纹。",
    "taglineEn": "Irregular flowing patterns run across the dark charcoal surface.",
    "optics": {
      "gloss": 58,
      "metallic": 72,
      "shift": 28
    },
    "material": {
      "metalness": 0.42,
      "roughness": 0.28,
      "clearcoat": 0.55,
      "clearcoatRoughness": 0.24,
      "flakeIntensity": 0.45,
      "iridescence": 0.12,
      "iridescenceIOR": 1.35,
      "sheenIntensity": 0.18
    }
  },
  {
    "id": "tpu-002fp",
    "code": "TPU-002FP",
    "name": "黑锻碳",
    "nameEn": "Forged Carbon Black",
    "finish": "special",
    "finishLabel": "锻碳",
    "finishLabelEn": "Forged Carbon",
    "seriesName": "锻碳 Forged",
    "seriesNameEn": "Forged Carbon",
    "hex": "#191A1E",
    "shiftHex": "#50535A",
    "hue": 0,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "黑色锻碳纹理呈方向各异的片状层次。",
    "taglineEn": "Angular patches turn in different directions across the black forged-carbon pattern.",
    "optics": {
      "gloss": 58,
      "metallic": 72,
      "shift": 28
    },
    "material": {
      "metalness": 0.42,
      "roughness": 0.28,
      "clearcoat": 0.55,
      "clearcoatRoughness": 0.24,
      "flakeIntensity": 0.45,
      "iridescence": 0.12,
      "iridescenceIOR": 1.35,
      "sheenIntensity": 0.18
    }
  },
  {
    "id": "tpu-cf",
    "code": "TPU-CF",
    "name": "碳纤维(黑)",
    "nameEn": "Carbon Fibre Black",
    "finish": "special",
    "finishLabel": "碳纤维",
    "finishLabelEn": "Carbon Fiber",
    "seriesName": "碳纤维 Carbon",
    "seriesNameEn": "Carbon Fiber",
    "hex": "#212327",
    "shiftHex": "#565A62",
    "hue": 0,
    "hueGroup": "neutral",
    "isNeutral": true,
    "isNew": false,
    "tagline": "黑色碳纹呈规律编织排列，明暗块面交替。",
    "taglineEn": "A regular black carbon weave alternates dark and light sections.",
    "optics": {
      "gloss": 58,
      "metallic": 72,
      "shift": 28
    },
    "material": {
      "metalness": 0.42,
      "roughness": 0.28,
      "clearcoat": 0.55,
      "clearcoatRoughness": 0.24,
      "flakeIntensity": 0.45,
      "iridescence": 0.12,
      "iridescenceIOR": 1.35,
      "sheenIntensity": 0.18
    }
  }
];

export function findColorSwatchByCode(code?: string | null): ColorFilmItem {
  if (!code) return COLOR_STUDIO_SWATCHES[2];
  const normalized = code.trim().toUpperCase();
  return (
    COLOR_STUDIO_SWATCHES.find((item) => item.code.toUpperCase() === normalized) ||
    COLOR_STUDIO_SWATCHES[2]
  );
}

export function matchesHueGroup(
  item: ColorFilmItem,
  hueGroup: ColorHueGroup,
): boolean {
  if (hueGroup === 'all') return true;
  return item.hueGroup === hueGroup;
}
