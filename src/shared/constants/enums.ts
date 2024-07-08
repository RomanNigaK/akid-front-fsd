export const enum MainMenuItemsType {
  'set' = 'set',
  'employee' = 'employee',
  'template' = 'template',
}

export const enum SetItemsType {
  'work' = 'work',
  'material' = 'material',
  'document' = 'document',
  'basic-option' = 'basic-option',
  'capture' = 'capture',
  'reqistry' = 'reqistry',
}

export enum Unit {
  'piece' = 'шт.',
  'm3' = 'м.куб',
  'm2' = 'м.кв',
  'lm' = 'м.п.',
}

export const units: { value: keyof typeof Unit; label: string }[] = [
  { value: 'piece', label: Unit.piece },
  { value: 'm2', label: Unit.m2 },
  { value: 'm3', label: Unit.m3 },
  { value: 'lm', label: Unit.lm },
];

export enum TypePerson {
  developer,
  construction,
  preparationProjectDocumentation,
  exploit,
  performedSubjectInspection,
}

export enum TemplateName {
  aosr = 'АОСР',
}
