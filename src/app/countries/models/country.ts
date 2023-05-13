export interface Country {
  name: string;
  capital: string;
  subregion: string;
  currencies: Currency[];
  languages: Language[];
}
export interface Currency {
  name: string;
  code: string;
  symbol: string;
}
export interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}
