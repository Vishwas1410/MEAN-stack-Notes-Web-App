import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, INotes, ITask, Itaskprogress,  } from '../models/common.model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  
  constructor(private http: HttpClient) { }
  getAllTask(): Observable<IApiResponse<ITask[]>>{
    return this.http.get<IApiResponse<ITask[]>>(`${apiEndpoint.TaskEndpoint}`)
  }
  getCompletedTask(): Observable<IApiResponse<ITask[]>>{
    return this.http.get<IApiResponse<ITask[]>>(`${apiEndpoint.completedTaskEndpoint}`)
  }
  completeTask(data:Itaskprogress,id:string){
    return this.http.patch(`${apiEndpoint.TaskEndpoint}/`+id+'/updatetaskprogress',data)
  }
  addTask(data:ITask){
    return this.http.post(`${apiEndpoint.TaskEndpoint}`,data)
  }
 
  
}
