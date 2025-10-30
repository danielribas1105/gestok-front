export type FilterOptions = string[];

export type FilterOptionsQuery = {
  [K in keyof FilterOptions]?: Exclude<
    FilterOptions[K],
    null
  > extends (infer T)[]
    ? T
    : never;
};

export type DetailedCaseEquipment = {
  equipment: string
  stls: string[]
}

export type DetailedCaseLayer = {
  url: string;
  name: string;
};

export type DetailedCaseDetectorResult = {
  detector_id: string;
  name: string;
  x: number;
  y: number;
  z: number;
  concentration: number;
};

export type DetailedCase = {
  id: string;
  logical_id: string;
  creator_id: string;
  gas_flow_rate: number;
  wind_velocity: number;
  gas_temperature: number;
  pressure?: number;
  leakage_point: {
    leakage_point_id: string;
    x: number;
    y: number;
    z: number;
    direction: string;
    flange_id: string;
  };
  wind: {
    direction: number;
    correction: number;
    calm: boolean;
  };
  gas: {
    composition: string;
    molar_mass: number;
    density: number;
    composition_json: Record<string, number>;
  };
  plume_2d: string;
  plume_3d: string;
  layers: DetailedCaseLayer[];
  detectors_result: DetailedCaseDetectorResult[];
  equipment: DetailedCaseEquipment
};

export type DefinedFilters = {
  moduleName: string;
  flangeName: string;
  equipmentName: string;
  leakage: string;
  flow: string
}