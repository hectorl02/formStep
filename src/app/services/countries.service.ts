import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private http: HttpClient,

  ) { }

  country() {
      return this.http.get<[]>(environment.url)
    }
}
