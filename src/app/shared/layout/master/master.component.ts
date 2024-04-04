import { Component, Input, OnInit } from '@angular/core';
import { LoginComponent } from '../../../pages/login/login.component';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { GetAllNote, NoteState } from '../../../store/NoteState';
import { NoteService } from '../../../core/services/note.service';
import { AuthService } from '../../../core/services/auth.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { INotes } from '../../../core/models/common.model';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [LoginComponent,HeaderComponent,RouterModule],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss'
})
export class MasterComponent implements OnInit {
  
  @Input() name!: INotes;
  @Select(NoteState.selectNotes) notes$ !: Observable<INotes[]>
  constructor(private noteService: NoteService,private authService: AuthService, private store: Store){}
  ngOnInit(): void {
      this.notes$.subscribe({
        next:(value)=> {
          if (!value.length) {
            this.store.dispatch(new GetAllNote())
            
          }
          
          
            
        },
      })
  }
  
   logout(){
    this.authService.logout().subscribe({
      next(){}
    })
  }
}

