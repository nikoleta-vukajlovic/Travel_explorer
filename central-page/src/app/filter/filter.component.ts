import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { range, from, Observable } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';
import { HttpClient } from '@angular/common/http';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ReceiverService } from '../receiver.service';
import { Destination } from '../destination';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  minDate = new Date();
  filteredDestinations : Destination[];
  departureDate : Date;
  returnDate : Date;
  priceInput : number;

  form: FormGroup = new FormGroup({});
  locations: string[] = ['Tara', 'Kopaonik', 'Djerdap'];

  constructor(private http: HttpClient, private receiver: ReceiverService) {

  }

  ngOnInit(): void {
    this.receiver.getDestinations();
    this.filteredDestinations = [];
  }

  onInputChange(event: MatSliderChange) {
    this.priceInput = event.value;
  }

  onInputDepartureDate(event: MatDatepickerInputEvent<Date>) {
    this.departureDate = event.value;
  }

  onInputReturnDate(event:  MatDatepickerInputEvent<Date>) {
    this.returnDate = event.value;
  }

  submit(){
      this.filteredDestinations =  this.receiver.dest.filter(elem => {
        if (this.priceInput === undefined){
          return true;
        }
        else if (elem.currency === 'RSD'){
          if (elem.price / 120 <= this.priceInput) {
          return true;
          }
        }
       else  if (elem.price <= this.priceInput) {
          return true;
        }
        })
    .filter(el => {
      const d1 = new Date(el.departure);
      if ( d1 >= this.departureDate || this.departureDate === undefined){
        return true;
      }
      return false;
    })
    .filter(el => {
      const d2 = new Date(el.arrival);
      if ( d2 <= this.returnDate || this.returnDate === undefined){
        return true;
      }
      return false;
    });
      this.receiver.dest = this.filteredDestinations;
      this.receiver.callNavigate('');

  }
}
