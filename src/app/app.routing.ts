import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DevicesManagerComponent } from './devices-manager/devices-manager.component';
//import { CanActivateAuthGuard } from './shared/can-activate.service';
//import { RouteComponent } from './shared/route.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent} from './register-user/register-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  {
    path: 'devices',
    component: DevicesManagerComponent    
  }
];


export const routing = RouterModule.forRoot(routes);
