import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IApiResponse,  INote,  INoteResponse, INotes, userid,  } from '../models/common.model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';
import { IUser } from '../models/auth.model';
import { UserService } from './user.service';
import { dA } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  
  constructor(private http: HttpClient,private us: UserService) { }
  getAllNotes(): Observable<IApiResponse<INotes[]>>{
    return this.http.get<IApiResponse<INotes[]>>(`${apiEndpoint.NoteEndpoint}`)
  }
  getDeletedNotes(): Observable<IApiResponse<INotes[]>>{
    return this.http.get<IApiResponse<INotes[]>>(`${apiEndpoint.deletedNotesEndpoint}`)
  }
  getPinnedNotes(): Observable<IApiResponse<INotes[]>>{
    return this.http.get<IApiResponse<INotes[]>>(`${apiEndpoint.pinnedNoteEndpoint}`)
  }
  addnote(data:INote){
    return this.http.post(`${apiEndpoint.NoteEndpoint}`,data)
  }
  viewNote(id:string): Observable<IApiResponse<INotes>>{
    return this.http.get<IApiResponse<INotes>>(`${apiEndpoint.NoteEndpoint}/`+id)
  }
  deleteNote(id:string): Observable<IApiResponse<INotes>>{
    return this.http.get<IApiResponse<INotes>>(`${apiEndpoint.NoteEndpoint}/`+id+'/delete')
  }
  
  
 
}
