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
import {FormBuilder} from '@angular/forms';
import {CountriesTableService} from "./countries-table.service";

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss'],
  providers: [CountriesTableService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesTableComponent implements AfterViewInit {

  @ViewChild(MatPaginator) private readonly paginator!: MatPaginator;

  @ViewChild(MatSort) private readonly sort!: MatSort;

  @Input({required: true}) set data(countries: Country[] | null) {
    this.initData(countries || []);
    if (countries !== null) {
      this.loading = false;
    }
  }

  @Output() reset = new EventEmitter<void>();

  readonly columns = ['name', 'capital', 'subregion', 'currencies', 'languages'];

  readonly dataSource = this.tableService.dataSource;

  readonly form = this.fb.group({
    name: '',
    subregion: '',
    currencies: '',
    languages: '',
  });

  subregions: string[] = [];
  currencies: string[] = [];
  languages: string[] = [];

  loading = true;

  constructor(
    private fb: FormBuilder,
    private tableService: CountriesTableService,
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private initData(data: Country[] = []) {
    this.tableService.dataSource.data = data;
    this.subregions = this.tableService.getFilterOptions('subregion');
    this.currencies = this.tableService.getFilterOptions('currencies');
    this.languages = this.tableService.getFilterOptions('languages');
  }

  applyFilter(name: string, value: string | null) {
    this.tableService.applyFilter(name, value);
  }

  resetFilter() {
    this.tableService.resetFilter();
    this.form.reset({
      name: '',
      subregion: '',
      currencies: '',
      languages: '',
    });
  }

  reload() {
    this.loading = true;
    this.resetFilter();
    this.reset.emit();
  }

  selectPill(name: string, value: string) {
    this.form.get(name)?.setValue(value);
    this.applyFilter(name, value);
  }
}
