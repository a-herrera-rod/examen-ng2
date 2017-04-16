import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { DevicesManagerComponent } from './devices-manager.component';
import { DevicesManagerService } from './shared/devices-manager.service';

describe('a devices-manager component', () => {
	let component: DevicesManagerComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				{ provide: DevicesManagerService, useClass: MockDevicesManagerService },
				DevicesManagerComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([DevicesManagerComponent], (DevicesManagerComponent) => {
		component = DevicesManagerComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});

// Mock of the original devices-manager service
class MockDevicesManagerService extends DevicesManagerService {
	getList(): Observable<any> {
		return Observable.from([ { id: 1, name: 'Device 1'}, { id: 2, name: 'Device 2'} ]);
	}
}
