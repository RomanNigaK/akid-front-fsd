import { TemplateName } from 'shared/constants/enums';

export type Template = {
  id: string;
  name: string;
  file: string;
  abbreviation: keyof typeof TemplateName;
  type: string;
  note: string;
  tag: TemplateName;
};
