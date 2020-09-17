import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';
import { Userpw } from '../userpw.model';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: Userpw;
  data;
  form: FormGroup = new FormGroup({});
  private readonly REST_API_SERVER = 'http://localhost:3000/api/usersRoutes/addUser/';
  existsIf = false;
  constructor(private http: HttpClient, private fb: FormBuilder,private router: Router) {

    this.form = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.user.username = this.form.value.username;
    this.user.password = this.form.value.password;
    this.data = JSON.stringify(this.user);
    this.http.post(this.REST_API_SERVER, this.user).subscribe(
      (val) => {
          console.log('POST call successful value returned in body',
                      val);
      },
      response => {
          console.log('POST call in error', response);
          if (response.status == 409){
              this.existsIf = true;
          }


      },
      () => {
          console.log('The POST observable is now completed.');
      });

    console.log(this.data);
    this.form.reset();
    this.router.navigate(['/signin']);
  }

  ngOnInit(): void {
    this.resetForm();
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
