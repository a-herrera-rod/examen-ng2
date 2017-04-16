import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { DevicesComponent } from './devices.component';
import { DevicesService } from './shared/devices.service';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { EmitterService, EmitterServiceMock } from "../shared/emitter.service";
import { EmmitterConstants } from "../shared/constants";

describe('a devices component', () => {
	let component: DevicesComponent;
	let emitterMock;
	// register all needed dependencies
	beforeEach(() => {
		emitterMock = new EmitterServiceMock();
		spyOn(emitterMock, "get").and.returnValue(new EventEmitter<any>());
		TestBed.configureTestingModule({
			imports: [HttpModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: DevicesService, useClass: MockDevicesService },
				DevicesComponent,
				EmmitterConstants,
				{ provide: EmitterService, useValue: emitterMock }
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([DevicesComponent], (DevicesComponent) => {
		component = DevicesComponent;
	}));

	it('should have an instance ', () => {
		expect(component).toBeDefined();
	});	
	it('should fecth list on ngInit', () => {
		//Arrange
		let model: any={
			Data:[{}], TotalRows:1, TotalPages:1
		};
		let service= TestBed.get(DevicesService);
		service.getList=()=>{
			return Observable.of(model)
		}
		//Act
		component.ngOnInit();
		//Assert
		expect(component.devices).toBe(model);
		expect(component.devices.length).toBe(model.length);
		expect(emitterMock.get).toHaveBeenCalled();
		expect(emitterMock.get).toHaveBeenCalledWith(EmmitterConstants.SEARCHTEXT_CHANGE);
	});
});

	// Mock of the original devices service
	class MockDevicesService extends DevicesService {
		getList(): Observable<any> {
			return Observable.from([{ id: 1, name: 'Device 1' }, { id: 2, name: 'Device 2' }]);
		}
	}
