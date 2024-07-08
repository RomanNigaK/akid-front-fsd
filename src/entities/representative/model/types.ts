export type Representative = {
  id: string;
  postCompany: string;
  fio: string;
  nrc?: string;
  dataOrder?: string;
  fileOrder?: {
    id: string;
    name: string;
    originalName: string;
  };
};
