import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapaComponent} from './mapa/mapa.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignupComponent } from './sign-up/signup.component';
import { LocationsComponent } from './locations/locations.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{path: '', component: MapaComponent},
{path: 'locations', component: LocationsComponent},
{path: 'signup', component: SignupComponent},
{path: 'signin', component: SignInComponent},
{path: 'profile', component: ProfileComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



