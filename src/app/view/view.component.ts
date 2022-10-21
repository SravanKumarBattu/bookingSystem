import { Component, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'mid', 'date','show', 'tickets','mobile','buttons'];

  dataSource: any;
  data: any;  //userObject

  constructor(private helper: HelperService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  // Get all booked users
  getAllUsers(){
    this.helper.getUsers().subscribe((data)=>{
      this.data=data;
    })
  }

  // Update details with dialogbox

  edit(element:any) {
    this.dialog.open(UpdateUserComponent, {
      width:'40%',
      data:element
    })
  }
  //delete booked user
  deleter(id:string){
    this.helper.deleteUser(id).subscribe(()=>{
      console.log("deleted");
      window.location.reload();
    })
  }
}
