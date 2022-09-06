import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwbcService } from 'app/Services/owbc.service';
import Swal from 'sweetalert2';
declare const $: any;


@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {
  RegisterForm: FormGroup
  public hasError = false
  userList: any;
  UserDetailsView: any;
  EditForm:FormGroup
  userId: any;

  constructor(private router: Router,private owbcservice: OwbcService) { 
    
    this.RegisterForm = new FormGroup({
      Name: new FormControl('',[Validators.required]),      
      number: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    this.EditForm = new FormGroup({
      Name: new FormControl('',[Validators.required]),      
      number: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  
  }

  ngOnInit(): void {
    this.getUsers();
  }

  //get users List
  getUsers() {
    this.owbcservice.getUser().subscribe((resp) => {
      if (resp.statusCode == 200) {
        this.userList = resp.data
        console.log("List", this.userList)
      }
    })
  }

  UserView(data) {
    $("#ViewModal").modal("show");

    this.UserDetailsView = data;
  }

  //create user

  adminRegister(){
    if(this.RegisterForm.valid){
      let loginObj = {
        name: this.RegisterForm.value.Name,
        phoneNumber: this.RegisterForm.value.number,
        password: this.RegisterForm.value.password,
      }
      // console.log('admin',loginObj)

      this.owbcservice.adminRegister(loginObj).subscribe((regResp) => {
        if(regResp.statusCode == 200){
          Swal.fire({
            icon: 'success',
            text: 'Registration Successful',
            showConfirmButton: false,
            timer: 3000,
          })

          
        }else{
          Swal.fire({
            icon: 'error',
            text: 'Please Enter Valid Credentials',

          })
        }
        this.RegisterForm.reset();
        $("#exampleModal").modal("hide");
        this.getUsers();

      })
    }else{
      this.hasError=true
      console.log('error')

    }

  }

//edit user
  userEdit(data) {
    $("#EditModal").modal("show");
    console.log("data", data);
    this.EditForm.controls["Name"].setValue(data.name);
    this.EditForm.controls["number"].setValue(data.phoneNumber);
    this.EditForm.controls["password"].setValue(data.password);  

    this.userId = data.userId;
    console.log("Id", this.userId);
  }

  UpdateUser() {
    if (this.EditForm.valid) {
      let updateUserObj = {
        userId: this.userId,
        name: this.EditForm.value.Name,
        phoneNumber: this.EditForm.value.number,
        password: this.EditForm.value.password,
      }
      console.log("test", updateUserObj)

      this.owbcservice.updateUser(updateUserObj).subscribe(
        (updateResp) => {
          if (updateResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "User Details Updated Successfully",
              timer: 2000,
              showConfirmButton: false,
            });

          }
          $("#EditModal").modal("hide");
          this.getUsers();
        }

      );
    }
    else(this.hasError = true)
  }

 

  

  //delete user
  Delete(item) {
    console.log("id", item);
    let deleteObj = {
      userId: item.userId,
    };
    Swal.fire({
      title: "Are you Sure?",
      text: "Want To Delete This Item..!",
      icon: "warning",
      confirmButtonText: "Yes, Delete it",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.owbcservice.deleteUser(deleteObj).subscribe((deleteResp) => {
          if (deleteResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "user Deleted Successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          this.getUsers();
        });
      } else if (result.isDenied) {
        Swal.fire("something went wrong..!", "error");
      }
    });
  }

}
