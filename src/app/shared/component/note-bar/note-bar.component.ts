import { Component, Input, OnInit } from '@angular/core';
import { INotes } from '../../../core/models/common.model';
import { HttpClient } from '@angular/common/http';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NoteService } from '../../../core/services/note.service';
import { NoteState, GetNote } from '../../../store/NoteState';
import { CommonModule } from '@angular/common';
import { UserDataComponent } from '../../layout/user-data/user-data.component';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';

@Component({
  selector: 'app-note-bar',
  standalone: true,
  imports: [CommonModule,UserDataComponent,RouterModule],
  templateUrl: './note-bar.component.html',
  styleUrl: './note-bar.component.scss'
})
export class NoteBarComponent implements OnInit {
  @Select(NoteState.displayNote) note$: Observable<INotes>
  
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      
      
     
    })
  }
  
  @Input() data!: INotes;
  constructor(private http: HttpClient,private noteService: NoteService,private store:Store,private route:ActivatedRoute){}
  
 
}
     


