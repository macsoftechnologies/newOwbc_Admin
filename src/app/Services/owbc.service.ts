import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwbcService {

  
  constructor(private httpClient:HttpClient) { }

//login
  public adminLogin(data: any): Observable <any> {
    try{
      return this.httpClient.post(environment.BaseUrl + 'admin/login', data)
    }catch(error){}
  }

 //register 

  public adminRegister(data: any): Observable <any> {
    try{
      return this.httpClient.post(environment.BaseUrl + 'user/addUser', data)
    }catch(error){}
  }

  //get user
  public getUser(): Observable <any> {
    try{
      return this.httpClient.get(environment.BaseUrl + 'user/getUsersList')
    }catch(error){}
  }

  //delete user
  public deleteUser(data: any): Observable <any> {
    try{
      return this.httpClient.post(environment.BaseUrl + 'user/delete',data)
    }catch(error){}
  }

  //update user
  public updateUser(data: any): Observable <any> {
    try{
      return this.httpClient.post(environment.BaseUrl + 'user/update',data)
    }catch(error){}
  }
  
  //register client

  public clientRegister(data: any): Observable <any> {
    try{
      return this.httpClient.post(environment.BaseUrl + 'client/createClient', data)
    }catch(error){}
  }

  //get client
  public getClient(): Observable <any> {
    try{
      return this.httpClient.get(environment.BaseUrl + 'client/getClients')
    }catch(error){}
  }

  //delete client
  public deleteClient(data: any): Observable <any> {
    try{
      return this.httpClient.post(environment.BaseUrl + 'client/deleteclient',data)
    }catch(error){}
  }

  //update client
  public updateClient(data: any): Observable <any> {
    try{
      return this.httpClient.post(environment.BaseUrl + 'client/editClient',data)
    }catch(error){}
  }

  //register product

  public productRegister(data: any): Observable <any> {
    try{
      return this.httpClient.post(environment.BaseUrl + 'products/createProduct', data)
    }catch(error){}
  }

  //get product
  public getProduct(): Observable <any> {
    try{
      return this.httpClient.get(environment.BaseUrl + 'products/getProduct')
    }catch(error){}
  }

  //delete product
  public deleteProduct(data: any): Observable <any> {
    try{
      return this.httpClient.post(environment.BaseUrl + 'products/deleteProduct',data)
    }catch(error){}
  }

  //update product
  public updateProduct(data: any): Observable <any> {
    try{
      return this.httpClient.post(environment.BaseUrl + 'products/updateProduct',data)
    }catch(error){}
  }

}
