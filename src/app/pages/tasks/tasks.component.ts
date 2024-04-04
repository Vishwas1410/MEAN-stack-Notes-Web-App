import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../../shared/layout/side-bar/side-bar.component';
import { NoteBarComponent } from '../../shared/component/note-bar/note-bar.component';
import { GetAllNote, NoteState } from '../../store/NoteState';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { INotes, ITask } from '../../core/models/common.model';
import { NoteService } from '../../core/services/note.service';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { TaskBarComponent } from '../../shared/layout/task-bar/task-bar.component';
import { GetAllTask, GetCompletedTasks, TaskState } from '../../store/TaskState';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [SideBarComponent,NoteBarComponent,CommonModule,TaskBarComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  completed:ITask[]
  @Select(TaskState.completedTask) completed$ !: Observable<ITask[]>
  @Select(TaskState.selectTask) tasks$ !: Observable<ITask[]>
  constructor(private noteService: NoteService,private authService: AuthService, private store: Store){}
  ngOnInit(): void {
     

      this.tasks$.subscribe({
         next:(value)=> {
          if (!value.length) {
            this.store.dispatch(new GetAllTask())

          }
          
          
            
        },
      });
      this.completed$.subscribe({
        next:(value)=> {
          if (!value.length) {
            this.store.dispatch(new GetCompletedTasks())
            
            
          }
          console.log(value);
          
          
            
        },
      });
  }
}
