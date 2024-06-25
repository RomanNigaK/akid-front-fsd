import { Unit } from 'shared/constants/enums';

export type Material = {
  id: string;
  name: string;
  amount: number;
  equipment: boolean;
  unit: keyof typeof Unit;
  files?: {
    id: string;
    name: string;
    originalName: string;
  }[];
};
