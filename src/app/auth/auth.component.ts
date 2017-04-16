import { Component, OnInit } from '@angular/core';

import { Auth } from './shared/auth.model';
import { AuthService } from './shared/auth.service';

@Component({
	selector: 'auth',
	templateUrl: 'auth.component.html',
	providers: [AuthService]
})

export class AuthComponent implements OnInit {
	auth: Auth[] = [];

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.authService.getList().subscribe((res) => {
			this.auth = res;
		});
	}
}