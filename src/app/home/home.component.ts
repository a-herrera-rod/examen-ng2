import { Component, OnInit } from '@angular/core';
import { MyCurrencyPipe } from '../shared/my-currency.pipe';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  date3: Date;
  balanceAmount: any;
   items: FirebaseListObservable<any[]>;

  constructor(private mycurpipe: MyCurrencyPipe,
  af: AngularFire) {    
    this.items = af.database.list('/devices');
  }

  ngOnInit() {
    console.log(this.items);
    this.balanceAmount = this.mycurpipe.transform("1234567.89");
  }
  getBalance(value) {
    return this.mycurpipe.transform(value);
  }
}
