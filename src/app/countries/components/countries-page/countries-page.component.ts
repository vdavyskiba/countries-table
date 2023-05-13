import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountriesApiService } from '../../services/countries-api.service';
import { Observable } from 'rxjs';
import { Country } from '../../models/country';

@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesPageComponent {
  countries$: Observable<Country[]> = this.getData();
  constructor(private countriesData: CountriesApiService) {}

  reload() {
    this.countries$ = this.getData();
  }

  private getData() {
    return this.countriesData.fetch();
  }
}
