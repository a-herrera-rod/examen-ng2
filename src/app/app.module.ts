import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { ApiService, EmitterService } from './shared';
import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

/* Prime NG */
import { CalendarModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { SharedModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';

/*Components  */
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DevicesComponent } from './devices/devices.component';
import { DevicesManagerComponent } from './devices-manager/devices-manager.component';
/* Directives and Pipes */
import { HighlightDirective} from './_directives/highlight';
import { MyCurrencyPipe } from './shared/my-currency.pipe';
import { MyCurrencyFormatterDirective } from './_directives/currency-formatter';

/* Guards & components login */
import { CanActivateAuthGuard } from './shared/can-activate.service';
import { UserProfileService} from './login/user-profile.service';
import { RouteComponent } from './shared/route.component';
import{ LoginComponent} from './login/login.component';
/* Reactive  forms */
import { RegisterUserComponent} from './register-user/register-user.component';

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
    ReactiveFormsModule,
    DialogModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    DevicesComponent,
    DevicesManagerComponent,    
    HighlightDirective,
    MyCurrencyPipe,
    MyCurrencyFormatterDirective,
    LoginComponent,
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
