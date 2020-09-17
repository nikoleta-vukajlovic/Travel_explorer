import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logined = false;
  constructor(public loginer: LoginService,private router: Router )
  { this.logined = loginer.logined;
  }

  ngOnInit(): void {
  }

}
