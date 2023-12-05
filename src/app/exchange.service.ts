import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  constructor(private http: HttpClient) {}

  getAllValues() {
    let h = new HttpParams().set(
      'access_key',
      'cc0c69355ca060873ff4989dad8629f0'
    );
    return this.http.get('http://apilayer.net/api/live', { params: h });
  }
}
