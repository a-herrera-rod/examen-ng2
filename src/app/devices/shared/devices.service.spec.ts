import { TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions, RequestMethod, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

//import { DevicesService } from './devices.service';
import { Devices } from './devices.model';

import 'rxjs/add/operator/map';


fdescribe('devices Service Test', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [
                BaseRequestOptions,
                MockBackend,
                ConnectionBackend,
                {
                    provide: Http, useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });
    });

    it('getList should return the data list', () => {
        //Arrange
        let mockBackend: MockBackend = TestBed.get(MockBackend);
        let expectedList: Devices[] = [{
            id: 1,
            name: "Device 1",
            status: "online"
        }];        
        mockBackend.connections.subscribe((connection: MockConnection) => {
            const expectedUrl = 'http://localhost:3000/devices?_sort=year_published&_order=ASC&q=';
            expect(connection.request.method).toBe(RequestMethod.Get);
            expect(connection.request.url).toBe(expectedUrl);

            connection.mockRespond(new Response(new ResponseOptions({
                body: expectedList
            })));
        });
        //let http = new Http(mockBackend, TestBed.get(BaseRequestOptions));
        //let service = new DevicesService(http);

        //Act
        //let observable = service.getList();

        //Assert
        /*observable.subscribe((result) => {
            expect(result).toBe(expectedList);
            done();
        });*/
    });

})