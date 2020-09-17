import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})

export class BaseComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {
  }
}
