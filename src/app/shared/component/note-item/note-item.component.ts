import { Component, Input, inject } from '@angular/core';
import { INotes } from '../../../core/models/common.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { apiEndpoint } from '../../../core/constants/constants';
import { Select, Store } from '@ngxs/store';
import { GetNote, NoteState } from '../../../store/NoteState';
import { Observable } from 'rxjs';
import { NoteService } from '../../../core/services/note.service';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './note-item.component.html',
  styleUrl: './note-item.component.scss'
})

export class NoteItemComponent {
   router =inject(Router)
   @Select(NoteState.displayNote) note$ !: Observable<INotes>
@Input() data!: INotes;
constructor(private http: HttpClient,private noteService: NoteService,private store:Store){}


}
