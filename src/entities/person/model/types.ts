import { ControlConstruction } from 'entities/controlConstruction';
import { Representative } from 'entities/representative';

export type Person = {
  id: string;
  inn: number;
  name: string;
  data: string;
  representative?: Representative;
  constructionControl?: ControlConstruction;
};
