import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  allCurrencies = [];
  msg = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get(
        'http://apilayer.net/api/live?access_key=79e10da009bf95d786ad2390b19a81d7'
      )
      .subscribe({
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
    this.http
      .get(
        'http://apilayer.net/api/live?access_key=79e10da009bf95d786ad2390b19a81d7'
      )
      .subscribe({
        next: (data) => {
          console.log(data['quotes']); //data.quotes
          let req = `USD${c2.value}`;
          this.msg = `Today, 1 USD worths ${data['quotes'][req]} ${c2.value}`;
        },
      });
  }
}
