import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../services/helper.service';
import { RootObject } from '../utilities/file';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TicketObject } from '../utilities/tickets';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  Mid : number;
  bookForm : FormGroup;

  data : any; //single movie
  tick : any; //total tickets object

  remaining_tickets: any; //updating booked seats object

  constructor( private helper: HelperService, private snackBar: MatSnackBar, private router: Router) {
    this.Mid=0;
    this.bookForm= new FormGroup({
      uname: new FormControl('',[Validators.required]),
      seats: new FormControl('', Validators.required),
      show: new FormControl('', Validators.required),
      mobile: new FormControl('',[Validators.required]),
      date: new FormControl(),

      });

  }

  ngOnInit(): void {

    // get mid when clicked
    // get Movie details and avail tickets
    this.Mid=this.helper.getMid();
    this.getMovieData(this.Mid);
    this.getAvailTick(this.Mid);
    this.loade();

  }

  //get movie by id
  getMovieData(id:number){
    this.helper.getMovie(id).subscribe((data:RootObject)=>{this.data=data;})
  }

  //get tick object by movie id
  getAvailTick(mid:number){
    this.helper.getTickets(mid).subscribe((data:TicketObject)=>{this.tick=data});

  }

  //booking form
  addData(bookForm: FormGroup){
    //check if form is empty
    if(this.Mid != 0 && bookForm.value.uname.trim() != "" && bookForm.value.seats != 0 && bookForm.value.show.trim() != "" )
    {
      //add booked user to api
    this.helper.addUser(bookForm.value.uname.trim(),bookForm.value.show.trim(),bookForm.value.seats,this.Mid, bookForm.value.mobile, bookForm.value.date).subscribe((data)=>{
      console.log(data);
        if (data) {
          //on success open snackbar and navigate to view component
          this.openSnackBar();
          this.router.navigate(['/view']);
        }});
    }
    //form is empty
    else{
      alert("Retry Booking with correct Details");
    }
  }

  openSnackBar() {
    let message : string;
    message="Seats are booked for movie";
    let action ="Done";
    this.snackBar.open(message,action);
  }

  //subtracting booked tickets

  reduceTicks(mid:number, ticks:number){

    const rem_tick =this.tick.tick_avail-ticks;
    this.helper.updateTicks(mid,rem_tick).subscribe((data)=>{this.remaining_tickets=data})

  }
  
  //book button loader
  loade(){
    const btns = document.querySelectorAll('button');
    btns.forEach((items)=>{
    items.addEventListener('click',(evt)=>{(evt.target as Element).classList.add('activeLoading');
    })
});
  }
}
