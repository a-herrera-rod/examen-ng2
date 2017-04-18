import { DeviceListComponent } from './deviceList/deviceList.component';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ApiService, EmitterService } from './shared';
import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

/* Prime NG */
import { CalendarModule } from 'primeng/primeng';
import {DataTableModule,SharedModule,DialogModule} from 'primeng/primeng';

/*Components  */
import { HomeComponent } from './home/home.component';
/* Directives and Pipes */
import { MyCurrencyPipe } from './shared/my-currency.pipe';

/* Guards & components login */
import { CanActivateAuthGuard } from './shared/can-activate.service';
import { UserProfileService} from './login/user-profile.service';
import { RouteComponent } from './shared/route.component';
import{ LoginComponent} from './login/login.component';
/* Reactive  forms */
import { RegisterUserComponent} from './register-user/register-user.component';
/*Firebase*/
import { AngularFireModule } from 'angularfire2';
export const firebaseConfig = {
    apiKey: "AIzaSyBuHlggh4pS_tma1wSBBbrsvv3qrML52qY",
    authDomain: "angular2-2017.firebaseapp.com",
    databaseURL: "https://angular2-2017.firebaseio.com",
    projectId: "angular2-2017",
    storageBucket: "angular2-2017.appspot.com",
    messagingSenderId: "191697508679"
  };

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpModule,
    FormsModule,
    routing,
    CalendarModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    MyCurrencyPipe,
    LoginComponent,
    DeviceListComponent,
    RouteComponent,
    RegisterUserComponent
  ],
  providers: [
    ApiService,
    EmitterService,
    MyCurrencyPipe,
    CanActivateAuthGuard,
    UserProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
