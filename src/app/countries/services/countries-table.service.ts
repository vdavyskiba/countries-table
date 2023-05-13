import {Injectable} from '@angular/core';
import {Country} from '../models/country';
import {MatTableDataSource} from "@angular/material/table";
import {defaultFilter, Filter, FilterOptions} from "../models/filter";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class CountriesTableService {

  readonly dataSource = new MatTableDataSource<Country>([]);

  private readonly _filter$ = new BehaviorSubject<Partial<Filter>>({...defaultFilter});

  readonly filter$ = this._filter$.asObservable();

  get hasFilter(): boolean {
    return !!this.dataSource.filter.length;
  }

  constructor() {
    this.dataSource.filterPredicate = this.filterPredicate();
  }

  updateFilter(name: keyof Filter, value: string) {
    this._filter$.next({[name]: value});
    this.applyFilter(name, value);
  }

  applyFilter(name: string, value: string) {
    this.dataSource.filter = this.buildFilter(this.dataSource.filter, name, value);
    this.dataSource.paginator?.firstPage();
  }

  resetFilter() {
    this._filter$.next({ ...defaultFilter });
    this.dataSource.filter = '';
    this.dataSource.paginator?.firstPage();
  }

  private filterPredicate(): (data: Country, filterStr: string) => boolean {

    return (data, filterStr): boolean  => {

      if(!filterStr) {
        return true;
      }

      const filters = new Map<keyof Country, string>(JSON.parse(filterStr));

      let match = false;

      for (let [name, filter] of filters) {

        const value = data[name];

        if (Array.isArray(value)) {
          match = value.findIndex(({name}) => name.toLowerCase() === filter) !== -1;
        } else {
          match = value.toLowerCase().includes(filter);
        }

        if (!match) {
          return false;
        }
      }

      return match;
    }
  }

  getFilterOptions(): FilterOptions {
    return {
      name: [],
      subregion: this.getFilterOption('subregion'),
      currencies: this.getFilterOption('currencies'),
      languages: this.getFilterOption('languages'),
    };
  }

  private getFilterOption(prop: keyof Filter): string[] {

    const options: string[] = this.dataSource.data.map(item => {
      const value = item[prop];
      return Array.isArray(value) ? value.map(({name}) => name) : value;
    }).flat();

    return Array.from(new Set(options));
  }

  private buildFilter(filterStr: string, name: string, rawValue: string | null): string {

    const filter = filterStr ? new Map(JSON.parse(filterStr)) : new Map();

    const value = rawValue ? rawValue.trim().toLowerCase() : '';

    filter.set(name, value);

    if(!value) {
      filter.delete(name);
    }

    return filter.size ? JSON.stringify(Array.from(filter.entries())) : '';
  }

}
