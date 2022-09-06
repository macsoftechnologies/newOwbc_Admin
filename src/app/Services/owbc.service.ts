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

}
