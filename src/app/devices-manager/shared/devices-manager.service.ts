import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { DevicesManager } from './devices-manager.model';

@Injectable()
export class DevicesManagerService {
	items: FirebaseListObservable<DevicesManager[]>;

	constructor(private af: AngularFire) {    				
		this.items = this.af.database.list('/devices');  
  }

	getList(): Observable<DevicesManager[]> {
		  
		return this.items.map(res => res.json() as DevicesManager[]);
	}
}