import { Unit } from 'shared/constants/enums';

export type MaterialRequest = {
  name: string;
  amount: number;
  equipment: boolean;
  unit: keyof typeof Unit;
};
