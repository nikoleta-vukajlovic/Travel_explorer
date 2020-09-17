import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Userpw } from '../userpw.model';
import { HttpClient} from '@angular/common/http';
import '../navbar/navbar.component';
import { LoginService } from '../login.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProfileComponent } from '../profile/profile.component';
import { Router } from '@angular/router';
import { ReceiverService } from '../receiver.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: Userpw;
  form: FormGroup = new FormGroup({});
  loginIncorrect = false;
  private readonly REST_API_SERVER = 'http://localhost:3000/api/usersRoutes/login/';

  constructor(private http: HttpClient, private fb: FormBuilder,private logined: LoginService, private router: Router, private receiver: ReceiverService) {

    this.form = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get f(){
    return this.form.controls;
  }

  login(){
    this.user.username = this.form.value.username;
    this.user.password = this.form.value.password;
    this.http.post(this.REST_API_SERVER, this.user).subscribe(
      (val) => {
          this.logined.logined = true;
          console.log('POST call successful value returned in body',
                      val);
          this.showProfile();
          const mapped = Object.entries(val).map(([type, value]) => ({type, value}));
          mapped[0].value.forEach(destName => {
            this.receiver.destinations.subscribe(niz => this.user.wishList.push(niz.find(d => d.location === destName.replace(/_/g,' '))));
          });
          console.log(this.user.wishList);
          this.logined.favourites = this.user.wishList;
      },
      response => {
          console.log('POST call in error', response);
          if (response.status == 401){
              this.loginIncorrect = true;
          }

      },
      () => {
          console.log('The POST observable is now completed.');
      });
    console.log(this.user);
    this.form.reset();
  }

  ngOnInit(): void {
    this.resetForm();
  }
  showProfile(): void {
    this.router.navigate(['/profile']);
    this.logined.username = this.user.username;

  }

  resetForm(form?: FormGroup){

    if (form != null) {
      form.reset();
    }
    this.user = {
      username: '',
      password: '',
      wishList: [],
    };
  }

}

