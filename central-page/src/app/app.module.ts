import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BaseComponent } from './base/base.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapaComponent } from './mapa/mapa.component';
import { FilterComponent } from './filter/filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { SignupComponent } from './sign-up/signup.component';
import { LocationsComponent } from './locations/locations.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatRippleModule} from '@angular/material/core';
import { MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { ReceiverService } from './receiver.service';
import { MatOptionModule} from '@angular/material/core';
import { GoogleMapsModule } from '@angular/google-maps';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { from } from 'rxjs';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    BaseComponent,
    NavbarComponent,
    MapaComponent,
    FilterComponent,
    SignupComponent,
    LocationsComponent,
    SignInComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [ReceiverService],
  bootstrap: [BaseComponent]
})
export class AppModule { }
