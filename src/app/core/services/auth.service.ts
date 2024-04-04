import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGoogleLogin, ILogin, ILoginResponse } from '../models/auth.model';
import { apiEndpoint } from '../constants/constants';
import { TokenService } from './token.service';
import {map} from 'rxjs'
declare var google:any;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) {
    
   }
   googlelogin(data:IGoogleLogin){
    return this.http.post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.googlelogin}`,
    data
    ).pipe(
      map((response)=>{
        console.log(response.data.token)
      if(response && response.data.token){
        this.tokenService.setToken(response.data.token)
      }
      return response;
    }));
   }

  login(data:ILogin){
    return this.http.post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`,
    data
    ).pipe(
      map((response)=>{
        console.log(response.data.token)
      if(response && response.data.token){
        this.tokenService.setToken(response.data.token)
      }
      return response;
    }));
  }



  logout(){
    return this.http.get(`${apiEndpoint.AuthEndpoint.logout}`).pipe(map((response)=>{
      if (response) {
        this.tokenService.removeToken()
        google.accounts.id.disableAutoSelect();
        sessionStorage.removeItem("loggedInUser")
      }
      return response;
    }))
  }
}
