import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './login.service';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  providers: [AuthService]
})
export class LoginComponent implements OnDestroy {
  private loginSub: Subscription;
  username:string;
  password:string;
  errorMessage:string;

  constructor(
    private loginService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService: UserProfileService) {
  }

  public get isLoggedIn() : boolean {
    return this.userProfileService.isLoggedIn;
  }
  login() {
    this.loginService
      .login(this.username, this.password)
      .then(()=>{
        
          this.errorMessage=undefined;
          console.log(`Successfully logged in`);
        this.route.queryParams.subscribe((r:any)=>{
          console.log(r.redirectTo)
          this.router.navigate(!!r.redirectTo?[r.redirectTo]: ['/']);
        });
        
        
      }).catch(()=>{
          this.errorMessage="Sus credenciales no son correctas";
        
      });
  }

  logout() {
    this.loginService.signOut();
    console.log(`Successfully logged out`);
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}