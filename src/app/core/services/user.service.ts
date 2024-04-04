import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IUserResponse } from '../models/common.model';
import { IUser } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  loggedInUser(): Observable<IUserResponse<IUser>>{
    return this.http.get<IUserResponse<IUser>>(`${apiEndpoint.AuthEndpoint.me}`)
    
    
  }
  getAllUsers(): Observable<IUserResponse<IUser[]>>{
    return this.http.get<IUserResponse<IUser[]>>(`${apiEndpoint.UserEndpoint}`)
  }



}
