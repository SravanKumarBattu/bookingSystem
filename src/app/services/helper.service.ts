import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { RootObject } from '../utilities/file';
import { UserObject } from '../utilities/user';
import { Ticketer, TicketObject } from '../utilities/tickets';
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  Mid:number; //movie id
  Uid:number; //user id

  url:string; //cinema api
  turl:string; //theater api
  uUrl:string; //users api

  constructor( private http: HttpClient) {
    this.Mid=0;
    this.Uid=0;
    this.url=environment.baseUrl;
    this.turl=environment.tUrl;
    this.uUrl=environment.userUrl;

  };

  // Services on Movies Start

  //get all movies data
  getMoviesData(): Observable<RootObject>{

    return this.http.get<RootObject>(this.url).pipe(retry(1), catchError(this.handleError));
  }

  //set Movie Id on click
  setMid(Mid:number){
    this.Mid=Mid;
  }
  //get Movie Id
  getMid(){
    return this.Mid;
  }

  //get movie by id
  getMovie(id:number)
  {
    return   this.http.get<RootObject>(this.url+'/'+id).pipe(retry(1), catchError(this.handleError));
  }

  // Services on Ticket Starts

  //get tickets with Movie Id
  getTickets(id:number): Observable<TicketObject>{
    return this.http.get<TicketObject>(this.turl+'/'+id).pipe(retry(1), catchError(this.handleError));
  }

  handleError(err:any){
    return throwError(()=>{console.log(err);
    })
  }

   //put request for updating tickets by subtracting booked tickets
   updateTicks(mid:number, tick:number){
    const tickets = new Ticketer();
    tickets.mid= mid;
    tickets.tick_avail=tick;

    const header=new Headers();
    header.set('Content-type','application/json');

    return this.http.put<TicketObject>(this.turl+'/'+mid,tickets).pipe(retry(1),catchError(this.handleError));

  }

  // Services on BookedUser Starts

  //add user who booked seats
  addUser(name:string, show:string,tickets:number, mid:number, mobile:number, date:Date){

    const user = new UserObject();
    user.name=name;
    user.show=show;
    user.mid=mid;
    user.tickets=tickets;
    user.mobile=mobile;
    user.date=date;
    console.log(user);
    const header=new HttpHeaders();
    header.set('Content-type','application/json');
    return this.http.post<UserObject>(`${environment.userUrl}`,user,{headers:header}).pipe(retry(1),catchError(this.handleError));

  }

  //get all booked users
  getUsers(){
    return this.http.get<UserObject>(environment.userUrl).pipe(retry(1),catchError(this.handleError));
  }


  //put request for updating user by form details and Userid
  updateUser(userForm:any,id:number){

    const user= new UserObject();
    user.date=userForm.value.date;
    user.name=userForm.value.uname;
    user.tickets=userForm.value.seats;
    user.show=userForm.value.show;
    user.mobile=userForm.value.mobile;
    user.mid=userForm.value.mid;

    // const headers=new Headers();
    // headers.set('Content-type','application/json');

    return this.http.put<UserObject>(environment.userUrl+'/'+id,user).pipe(retry(1),catchError(this.handleError))
  }

  //delete user by userid
  deleteUser(id:string){
    return this.http.delete(environment.userUrl+'/'+id).pipe(retry(1),catchError(this.handleError));
  }
}
