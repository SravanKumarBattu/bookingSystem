import { Component, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { RootObject } from '../utilities/file';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

Mdata : any;

constructor(private helper: HelperService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  // get all animes data into Mdata
  getAllData(){
    this.helper.getMoviesData().subscribe((data:RootObject)=>{
      this.Mdata=data.data;
      //localStorage.setItem("data", JSON.stringify(data));
      // console.log(localStorage.getItem("data"));

    })
  }
  
  //Set MovieId on click
  setter(id:number)
  {
    this.helper.setMid(id);
  }

}
