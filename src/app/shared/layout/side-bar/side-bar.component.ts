import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, inject } from '@angular/core';
import { NoteItemComponent } from '../../component/note-item/note-item.component';
import { NotesComponent } from '../../../pages/notes/notes.component';
import { MasterComponent } from '../master/master.component';
import { Select, Store } from '@ngxs/store';
import { GetAllNote, NoteState } from '../../../store/NoteState';
import { Observable } from 'rxjs';
import { INotes } from '../../../core/models/common.model';
import { NoteService } from '../../../core/services/note.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule, NgFor } from '@angular/common';
import { GetLoggedInUser, UserState } from '../../../store/UserState';
import { ILoginResponse, IUser } from '../../../core/models/auth.model';
import router from '../../../../../backend/src/routes/route';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../../../pages/create/create.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [NoteItemComponent,NotesComponent,CommonModule,RouterModule,NgFor],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
  @Input() data!: IUser;
  user:IUser
  
  @Select(UserState.getLoggedUser) user$ !: Observable<IUser>
  constructor(private authService: AuthService,private dialogRef:MatDialog,private store : Store){
  }
  addnote():void{
    this.dialogRef.open(CreateComponent,{
    
    })
  }
  ngOnInit(): void {
    this.store.dispatch(new GetLoggedInUser())
    this.user$.subscribe((res:IUser)=>{
      this.user=res
    })
    
    
  }
  
  
  logout(){
    
    this.authService.logout().subscribe({
      next(){}
    })
  }
}
