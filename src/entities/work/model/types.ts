import { Unit } from 'shared/constants/enums';

export type Work = {
  id: string;
  name: string;
  amount: number;
  unit: keyof typeof Unit;
  count?: number;
};
