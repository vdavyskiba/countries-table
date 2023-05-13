export interface Filter {
  name: string;
  subregion: string;
  currencies: string;
  languages: string;
}

export type FilterOptions = { [P in keyof Filter]: string[] };

export const defaultFilter: Filter = {
  name: '',
  subregion: '',
  currencies: '',
  languages: '',
}

export const defaultFilterOptions: FilterOptions = {
  name: [],
  subregion: [],
  currencies: [],
  languages: [],
}
