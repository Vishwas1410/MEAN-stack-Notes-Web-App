import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../../shared/layout/side-bar/side-bar.component';
import { Select, Store } from '@ngxs/store';
import { GetDeletedNotes, NoteState } from '../../store/NoteState';
import { Observable } from 'rxjs';
import { INotes } from '../../core/models/common.model';
import { CommonModule } from '@angular/common';
import { NoteItemComponent } from '../../shared/component/note-item/note-item.component';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [SideBarComponent,CommonModule,NoteItemComponent],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.scss'
})
export class TrashComponent  implements OnInit{
  
  @Select(NoteState.deletedNotes) deletedNote$ !: Observable<INotes[]>
  constructor(private store:Store){

  }
ngOnInit(): void {
    
    this.deletedNote$.subscribe({
      next:(value)=> {
        this.store.dispatch(new GetDeletedNotes())
      },
    }
    )
}

}
