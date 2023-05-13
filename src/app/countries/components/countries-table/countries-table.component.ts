import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {Country} from '../../models/country';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CountriesTableService} from '../../services/countries-table.service';
import {Filter, defaultFilterOptions, FilterOptions} from '../../models/filter';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss'],
  providers: [CountriesTableService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesTableComponent implements AfterViewInit {

  readonly columns = ['name', 'capital', 'subregion', 'currencies', 'languages'];

  readonly dataSource = this.tableService.dataSource;

  @ViewChild(MatPaginator) private readonly paginator!: MatPaginator;

  @ViewChild(MatSort) private readonly sort!: MatSort;

  @Input({required: true}) set data(countries: Country[] | null) {
    this.initData(countries);
  }

  @Output() reset = new EventEmitter<void>();

  filterOptions: FilterOptions  = defaultFilterOptions;

  loading = true;

  constructor(private tableService: CountriesTableService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private initData(data: Country[] | null) {
    this.loading = data === null;
    this.tableService.dataSource.data = data || [];
    this.filterOptions = this.tableService.getFilterOptions();
  }

  reload() {
    this.loading = true;
    this.tableService.resetFilter();
    this.reset.emit();
  }

  selectPill(name: keyof Filter, value: string) {
    this.tableService.updateFilter(name, value);
  }
}
