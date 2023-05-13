import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';
import { Observable } from 'rxjs';

@Injectable()
export class CountriesApiService {
  constructor(private http: HttpClient) { }

  fetch(): Observable<Country[]> {
    return this.http.get<Country[]>('https://restcountries.com/v2/region/europe')
  }
}
