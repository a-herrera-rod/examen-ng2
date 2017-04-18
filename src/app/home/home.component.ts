import { Component, OnInit } from '@angular/core';
import { Devices } from './home.model';
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

  displayDialog: boolean;
  devices: Devices[];
  dev: Devices = new Devices();
  newDev: boolean;
  selectedDevice: Devices;

  constructor(private af: AngularFire) {    
    this.items = this.af.database.list('/devices');    
  }

    showDialogToAdd() {
        this.newDev = true;
        this.dev = new Devices();
        this.displayDialog = true;
    }
    
    save() {
        if(this.newDev)
            this.devices.push(this.dev);
        else
            this.devices[this.findSelectedCarIndex()] = this.dev;
        
        this.dev = null;
        this.displayDialog = false;
    }
    
    delete() {
        this.devices.splice(this.findSelectedCarIndex(), 1);
        this.dev = null;
        this.displayDialog = false;
    }    
    
    onRowSelect(event) {
        this.newDev = false;
        this.dev = this.cloneDev(event.data);
        this.displayDialog = true;
    }
    
    cloneDev(d: Devices): Devices {
        let dev = new Devices();
        for(let prop in d) {
            dev[prop] = d[prop];
        }
        return dev;
    }
    
    findSelectedCarIndex(): number {
        return this.devices.indexOf(this.selectedDevice);
    }

  ngOnInit() {
    console.log(this.items);
    //this.items.map(res=>res as Devices[]).subscribe(data=>this.devices = data);
    //this.devices = this.items.map(res => res.json() as Devices[]);
  }
}
