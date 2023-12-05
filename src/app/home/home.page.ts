import { Component } from '@angular/core';
import { ExchangeService } from '../exchange.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  allCurrencies = [];

  constructor(private exchange: ExchangeService) {}

  ngOnInit() {
    this.exchange.getAllValues().subscribe({
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
