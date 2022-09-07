import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwbcService } from 'app/Services/owbc.service';
import Swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.scss']
})
export class ClientdetailsComponent implements OnInit {

  createForm: FormGroup
  public hasError = false
  clientList: any;
  ClientDetailsView: any;
  EditForm:FormGroup
  clientId: any;
  

  constructor(private router: Router,private owbcservice: OwbcService) { 

    this.createForm = new FormGroup({
      CliName: new FormControl('',[Validators.required]),      
      CliNum: new FormControl('',[Validators.required]),
      CliAddr: new FormControl('', [Validators.required])
    })

    this.EditForm = new FormGroup({
      cliname: new FormControl('',[Validators.required]),      
      clinum: new FormControl('',[Validators.required]),
      cliaddr: new FormControl('', [Validators.required])
    })

  }

  ngOnInit(): void {
    this.getClients();
  }

  //get users List
  getClients() {
    this.owbcservice.getClient().subscribe((resp) => {
      if (resp.statusCode == 200) {
        this.clientList = resp.data
        console.log("List", this.clientList)
      }
    })
  }

  ClientView(data) {
    $("#ViewModal").modal("show");

    this.ClientDetailsView = data;
  }

  //create client

  addClient(){
    if(this.createForm.valid){
      let clientObj = {
        clientName: this.createForm.value.CliName,
        clientPhNumber: this.createForm.value.CliNum,
        Address: this.createForm.value.CliAddr,
      }
      // console.log('admin',loginObj)

      this.owbcservice.clientRegister(clientObj).subscribe((regResp) => {
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
        this.createForm.reset();
        $("#exampleModal").modal("hide");
        this.getClients();

      })
    }else{
      this.hasError=true
      console.log('error')

    }

  }

//edit user
  clientEdit(data) {
    $("#EditModal").modal("show");
    console.log("data", data);
    this.EditForm.controls["cliname"].setValue(data.clientName);
    this.EditForm.controls["clinum"].setValue(data.clientPhNumber);
    this.EditForm.controls["cliaddr"].setValue(data.Address);  

    this.clientId = data.clientId;
    console.log("Id", this.clientId);
  }

  UpdateClient() {
    if (this.EditForm.valid) {
      let updateClientObj = {
        clientId: this.clientId,
        clientName: this.EditForm.value.cliname,
        clientPhNumber: this.EditForm.value.clinum,
        Address: this.EditForm.value.cliaddr
      }
      console.log("test", updateClientObj)

      this.owbcservice.updateClient(updateClientObj).subscribe(
        (updateResp) => {
          if (updateResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "Client Details Updated Successfully",
              timer: 2000,
              showConfirmButton: false,
            });

          }
          $("#EditModal").modal("hide");
          this.getClients();
        }

      );
    }
    else(this.hasError = true)
  }

 

  

  //delete user
  Delete(item) {
    console.log("id", item);
    let deleteObj = {
      clientId: item.clientId,
    };
    Swal.fire({
      title: "Are you Sure?",
      text: "Want To Delete This Item..!",
      icon: "warning",
      confirmButtonText: "Yes, Delete it",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.owbcservice.deleteClient(deleteObj).subscribe((deleteResp) => {
          if (deleteResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "user Deleted Successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          this.getClients();
          
        });
      } else if (result.isDenied) {
        Swal.fire("something went wrong..!", "error");
      }
    });
  }
 
}
