import { Component, OnInit } from '@angular/core';
import { AngularFire,FirebaseListObservable } from 'angularfire2';

@Component({
	selector: 'deviceList',
	templateUrl: 'deviceList.component.html'
})

export class DeviceListComponent implements OnInit {
	items: FirebaseListObservable<any[]>;
	 displayDialog: boolean;

    device: any = {};
    
    selectedDevice: any;
    
    newDevice: boolean;

	constructor(private af: AngularFire){}
	showDialogToAdd() {
        this.newDevice = true;
        this.device = {};
        this.displayDialog = true;
    }
	save() {
        if(this.newDevice)
            this.items.push(this.device);
        else
			this.items.update(this.device.$key, this.device)
        
        this.device = null;
        this.displayDialog = false;
    }
    
    delete() {
        this.items.remove(this.device.$key);
        this.device = null;
        this.displayDialog = false;
    }
	onRowSelect(event) {
        this.newDevice = false;
        this.device = event.data;
        this.displayDialog = true;
    }
	ngOnInit() {
		this.items = this.af.database.list('devices');
	 }
	onUpdateRow(data){
		console.log(data);
	}
}	