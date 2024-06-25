export type Person = {
  inn: number;
  name: string;
  data: string;
  representative?: {
    postCompany: string;
    fio: string;
    nrc: string;
    order: string;
  };
  controlConstruction?: {
    postCompany: string;
    fio: string;
    nrc: string;
    order: string;
  };
};
