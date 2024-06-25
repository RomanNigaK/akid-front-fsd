import { Unit } from 'shared/constants/enums';

export type WorkRequest = {
  name: string;
  amount: number;
  unit: keyof typeof Unit;
};
