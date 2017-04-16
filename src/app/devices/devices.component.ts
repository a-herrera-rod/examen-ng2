import { Component, OnInit } from '@angular/core';

import { Devices } from './shared/devices.model';
import { DevicesService } from './shared/devices.service';
//import { EmitterService, EmmitterConstants} from '../shared/index';

@Component({
	selector: 'devices',
	templateUrl: 'devices.component.html',
	styleUrls: ['./devices.component.scss'],
	providers: [DevicesService]
})

export class DevicesComponent implements OnInit {
	devices: Devices[] = [];
	
	constructor(private devicesService: DevicesService,
	//private emitterService: EmitterService,
	) { }

	ngOnInit() {
		this.UpdateList();
		//this.isInitDone = true;		
	}
	ngOnChanges() {
		console.log("updating");		
	}
	UpdateList() {
		this.devicesService.getList().subscribe((res) => {
			this.devices = res;
		});
	}
}