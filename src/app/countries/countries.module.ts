import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountriesTableComponent} from './components/countries-table/countries-table.component';
import {CountriesApiService} from './services/countries-api.service';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CountriesPageComponent} from './components/countries-page/countries-page.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {CountriesFilterComponent} from './components/countries-filter/countries-filter.component';



@NgModule({
  declarations: [
    CountriesTableComponent,
    CountriesPageComponent,
    CountriesFilterComponent,
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        MatButtonModule,
        FormsModule,
        MatToolbarModule,
        MatSortModule,
        ReactiveFormsModule,
        MatIconModule,
    ],
  exports: [
    CountriesTableComponent,
    CountriesPageComponent,
  ],
  providers: [
    CountriesApiService,
  ]
})
export class CountriesModule { }
