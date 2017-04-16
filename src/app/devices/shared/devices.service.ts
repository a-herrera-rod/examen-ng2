import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Devices } from './devices.model';

@Injectable()
export class DevicesService {
items: FirebaseListObservable<Devices[]>;

	constructor(private af: AngularFire) {        	
		this.items = this.af.database.list('/devices');
	}

	getList(): Observable<Devices[]> {		
		return this.items.map(res => res.json() as Devices[]);
	}
}