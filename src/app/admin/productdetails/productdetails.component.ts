import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwbcService } from 'app/Services/owbc.service';
import Swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {

  createForm: FormGroup;
  public hasError = false;  
  EditForm:FormGroup;
  productList: any;
  ProductDetailsView: any;
  ProductId: any;

  
  constructor(private router: Router,private owbcservice: OwbcService) { 

    this.createForm = new FormGroup({
      ProdName: new FormControl('',[Validators.required]),      
      ProdPrice: new FormControl('',[Validators.required]),
      ProdSpec: new FormControl('', [Validators.required])
    })

    this.EditForm = new FormGroup({
      prodname: new FormControl('',[Validators.required]),      
      prodprice: new FormControl('',[Validators.required]),
      prodspec: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getProducts();
  }

   //get products
   getProducts() {
    this.owbcservice.getProduct().subscribe((resp) => {
      if (resp.statusCode == 200) {
        this.productList = resp.data
        console.log("List", this.productList)
      }
    })
  }

  ProductView(data) {
    $("#ViewModal").modal("show");

    this.ProductDetailsView = data;
  }

  //create client

  addProduct(){
    if(this.createForm.valid){
      let prodObj = {
        productName: this.createForm.value.ProdName,
        price: this.createForm.value.ProdPrice,
        specifications: this.createForm.value.ProdSpec,
      }
      // console.log('admin',loginObj)

      this.owbcservice.productRegister(prodObj).subscribe((regResp) => {
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
        this.getProducts();

      })
    }else{
      this.hasError=true
      console.log('error')

    }

  }

//edit user
  productEdit(data) {
    $("#EditModal").modal("show");
    console.log("data", data);
    this.EditForm.controls["prodname"].setValue(data.productName);
    this.EditForm.controls["prodprice"].setValue(data.price);
    this.EditForm.controls["prodspec"].setValue(data.specifications);  

    this.ProductId = data.ProductId;
    console.log("Id", this.ProductId);
  }

  UpdateProduct() {
    if (this.EditForm.valid) {
      let updateProdObj = {
        ProductId: this.ProductId,
        productName: this.EditForm.value.prodname,
        price: this.EditForm.value.prodprice,
        specifications: this.EditForm.value.prodspec
      }
      console.log("test", updateProdObj)

      this.owbcservice.updateProduct(updateProdObj).subscribe(
        (updateResp) => {
          if (updateResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "Product Details Updated Successfully",
              timer: 2000,
              showConfirmButton: false,
            });

          }
          $("#EditModal").modal("hide");
          this.getProducts();
        }

      );
    }
    else(this.hasError = true)
  }

 

  

  //delete user
  Delete(item) {
    console.log("id", item);
    let deleteObj = {
      ProductId: item.ProductId,
    };
    Swal.fire({
      title: "Are you Sure?",
      text: "Want To Delete This Item..!",
      icon: "warning",
      confirmButtonText: "Yes, Delete it",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.owbcservice.deleteProduct(deleteObj).subscribe((deleteResp) => {
          if (deleteResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "Product Deleted Successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          this.getProducts();
          
        });
      } else if (result.isDenied) {
        Swal.fire("something went wrong..!", "error");
      }
    });
  }

}
