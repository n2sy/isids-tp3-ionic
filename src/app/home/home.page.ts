import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  allCurrencies = [];

  constructor(private http : HttpClient) {}

  ngOnInit() {
      this.http.get('http://apilayer.net/api/live?access_key=cc0c69355ca060873ff4989dad8629f0').subscribe({
      next: (data) => {
        //console.log(Object.keys(data['quotes']));
        for (const curr in data['quotes']) {
          this.allCurrencies.push(curr.slice(-3));
        }
        console.log(this.allCurrencies);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onConvert(c2) {
    console.log(c2.value);
  }
}
