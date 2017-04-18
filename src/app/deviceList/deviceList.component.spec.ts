import { TestBed, inject } from '@angular/core/testing';

import { DeviceListComponent } from './deviceList.component';

describe('a deviceList component', () => {
	let component: DeviceListComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DeviceListComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([DeviceListComponent], (DeviceListComponent) => {
		component = DeviceListComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});