import {Injectable} from '@angular/core';
import {Country} from '../../models/country';
import {MatTableDataSource} from "@angular/material/table";

@Injectable()
export class CountriesTableService {

  readonly dataSource = new MatTableDataSource<Country>([]);

  constructor() {
    this.dataSource.filterPredicate = this.initFilter();
  }

  applyFilter(name: string, value: string | null) {
    this.dataSource.filter = this.updateFilter(this.dataSource.filter, name, value);
    this.dataSource.paginator?.firstPage();
  }

  resetFilter() {
    this.dataSource.filter = '';
    this.dataSource.paginator?.firstPage();
  }

  private initFilter(): (data: Country, filterStr: string) => boolean {

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

  getFilterOptions(prop: keyof Country): string[] {

    const options: string[] = this.dataSource.data.map(item => {
      const value = item[prop];
      return Array.isArray(value) ? value.map(({name}) => name) : value;
    }).flat();

    return Array.from(new Set(options));
  }

  private updateFilter(filterStr: string, name: string, rawValue: string | null): string {

    const filter = filterStr ? new Map(JSON.parse(filterStr)) : new Map();

    const value = rawValue ? rawValue.trim().toLowerCase() : '';

    filter.set(name, value);

    if(!value) {
      filter.delete(name);
    }

    return filter.size ? JSON.stringify(Array.from(filter.entries())) : '';
  }

}
