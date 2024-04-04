import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { SideBarComponent } from '../../shared/layout/side-bar/side-bar.component';
import { NoteService } from '../../core/services/note.service';
import { AuthService } from '../../core/services/auth.service';
import { Select, Store } from '@ngxs/store';
import { DeleteNote, GetAllNote, GetNote, NoteState } from '../../store/NoteState';
import { Observable } from 'rxjs';
import { INotes } from '../../core/models/common.model';
import { CommonModule } from '@angular/common';
import { NoteItemComponent } from '../../shared/component/note-item/note-item.component';
import { NoteBarComponent } from '../../shared/component/note-bar/note-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { an, dA } from '@fullcalendar/core/internal-common';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [SideBarComponent,CommonModule,NoteItemComponent,NoteBarComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {
  
  sub:any;
  note:INotes
  @Select(NoteState.deleteselectedNote) del$!: Observable<INotes>
  @Select(NoteState.displayNote) note$ !: Observable<INotes>
  @Select(NoteState.selectNotes) notes$ !: Observable<INotes[]>
  constructor(private noteService: NoteService,private authService: AuthService, private store: Store,private dialogRef: MatDialog,private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.store.dispatch(new GetNote(params.id))
      this.sub=this.note$.subscribe((res)=>{
        this.note=res
        
      })
      console.log(this.note);
      
      
      
      
      
    })
    
    
    
    
    
    
      this.notes$.subscribe({
         next:(value)=> {
          if (!value.length) {
            this.store.dispatch(new GetAllNote())

          }
          
          
            
        },
      })
  }
  addnote():void{
    this.dialogRef.open(CreateComponent,{
     
    })
  }
  deletenote(id:string){
    
    this.del$.subscribe({
      next:(value)=> {
          this.store.dispatch(new DeleteNote(id))
          
      },
    
    })
    this.router.navigate(['/trash'])
    
  }
  


 
  
   logout(){
    this.authService.logout().subscribe({
      next(){}
    })
  }

}
