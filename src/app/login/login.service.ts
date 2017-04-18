import { UserProfileService } from './user-profile.service';
import { Injectable } from '@angular/core';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';


@Injectable()
export class AuthService {
  private authState: FirebaseAuthState = null;

  constructor(public auth$: AngularFireAuth, public UserProfileService: UserProfileService) {

    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      console.log(state);
    });
  }

  get authenticated(): Boolean {
    return this.authState !== null;
  }
  get authuid(): string {
    return this.authState.uid;
  }

  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }
  createNewUser(user): firebase.Promise<any> {

    return this.auth$.createUser(user);
  }

  login(email: string, password: string): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login(
      { email: email, password: password },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(()=>{this.toggleLogState(true)});
  }

  signOut(): void {
    this.auth$.logout();
    this.toggleLogState(false);
  }

  displayName(): string {
    if (this.authState != null) {
      return this.authState.auth.email;
    } else {
      return '';
    }
  }
  private toggleLogState(val: boolean) {
    console.log(val);
    this.UserProfileService.isLoggedIn = val;
  }
}