import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwbcService } from 'app/Services/owbc.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup
  public hasError = false
 

  constructor(private router: Router,private owbcservice: OwbcService) { 
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-private HatthiServices: HatthiServicez0-9.-]+\.[a-z]{2,4}$/
    this.LoginForm = new FormGroup({
      Email: new FormControl('',[Validators.required, Validators.pattern(emailRegex)]),
      password: new FormControl('', [Validators.required])
    })
  
  }

  ngOnInit(): void {
  }

  adminLogin(){
    if(this.LoginForm.valid){
      let loginObj = {
        email: this.LoginForm.value.Email,
        password: this.LoginForm.value.password,
      }
      // console.log('admin',loginObj)

      this.owbcservice.adminLogin(loginObj).subscribe((loginResp) => {
        if(loginResp.statusCode == 200){
          Swal.fire({
            icon: 'success',
            text: 'Successfully logged in',
            showConfirmButton: false,
            timer: 3000,
          })
          this.router.navigateByUrl('/admin/Dashboard')
        }else{
          Swal.fire({
            icon: 'error',
            text: 'Please Enter Valid Credentials',

          })
        }
      })
    }else{
      this.hasError=true
      console.log('error')

    }

  }

}
