import { DeviceListComponent } from './deviceList/deviceList.component';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CanActivateAuthGuard } from './shared/can-activate.service';
import { RouteComponent } from './shared/route.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent} from './register-user/register-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  {
    path: 'deviceList',
    component: RouteComponent,
    canActivate: [CanActivateAuthGuard],
    canActivateChild: [CanActivateAuthGuard],
    children: [
      { path: '', component: DeviceListComponent }
    ]
  }
];


export const routing = RouterModule.forRoot(routes);
