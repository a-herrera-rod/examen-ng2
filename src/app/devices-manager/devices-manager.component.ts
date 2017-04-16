import { Component, OnInit } from '@angular/core';

import { DevicesManager } from './shared/devices-manager.model';
import { DevicesManagerService } from './shared/devices-manager.service';

@Component({
	selector: 'devices-manager',
	templateUrl: 'devices-manager.component.html',
	providers: [DevicesManagerService]
})

export class DevicesManagerComponent implements OnInit {
	devicesManager: DevicesManager[] = [];
	constructor() { }

	ngOnInit() {
	}
}