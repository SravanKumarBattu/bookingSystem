import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userForm:FormGroup; //Updateform
  //inject data
  constructor(private helper: HelperService, @Inject(MAT_DIALOG_DATA) public editDetails :any, private dialogRef:MatDialogRef<UpdateUserComponent>) {

    this.userForm = new FormGroup({
      uname: new FormControl('',[Validators.required]),
      seats: new FormControl('', Validators.required),
      show: new FormControl('', Validators.required),
      mobile: new FormControl('',[Validators.required]),
      date: new FormControl(),
      mid: new FormControl('',[Validators.required]),

    })
  }

  ngOnInit(): void {

    //set the booked details in the updating form
    this.autowritten(this.editDetails);


  }

  autowritten( editDetails:any){
    if(this.editDetails){
      this.userForm.controls['uname'].setValue(this.editDetails.name);
      this.userForm.controls['seats'].setValue(this.editDetails.tickets);
      this.userForm.controls['show'].setValue(this.editDetails.show);
      this.userForm.controls['mobile'].setValue(this.editDetails.mobile);
      this.userForm.controls['date'].setValue(this.editDetails.date);
      this.userForm.controls['mid'].setValue(this.editDetails.mid)
      this.userForm.controls['mid'].disable();

    }
  }

  // Update user details and reload upon updating
  updateDetails(){
    this.helper.updateUser(this.userForm,this.editDetails.id).subscribe((data)=>{
      console.log(data);
      window.location.reload();
    });

    this.dialogRef.close('update');

  }

}
