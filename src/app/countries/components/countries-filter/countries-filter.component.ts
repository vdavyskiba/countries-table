import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CountriesTableService} from '../../services/countries-table.service';
import {defaultFilter, Filter, defaultFilterOptions, FilterOptions} from '../../models/filter';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-countries-filter',
  templateUrl: './countries-filter.component.html',
  styleUrls: ['./countries-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesFilterComponent {

  readonly form = this.fb.group({...defaultFilter });

  @Input({required: true}) formOptions: FilterOptions = defaultFilterOptions;

  get hasFilter(): boolean {
    return this.tableService.hasFilter
  }

  constructor(
    private fb: FormBuilder,
    private tableService: CountriesTableService,
  ) {
    this.tableService.filter$.pipe(takeUntilDestroyed()).subscribe(data => {
      this.form.patchValue(data);
    })
  }

  applyFilter(name: keyof Filter, value: string | null) {
    this.tableService.applyFilter(name, value ?? '');
  }

  resetFilter() {
    this.tableService.resetFilter();
  }

}
