import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, createComponent } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/layout/header/header.component';
import { NoteItemComponent } from '../../shared/component/note-item/note-item.component';
import { Select, Store } from '@ngxs/store';
import { GetAllNote,  GetPinnedNotes,  NoteState } from '../../store/NoteState';
import { Observable } from 'rxjs';
import { INotes, ITask, } from '../../core/models/common.model';
import { NoteService } from '../../core/services/note.service';
import { AuthService } from '../../core/services/auth.service';
import { SideBarComponent } from '../../shared/layout/side-bar/side-bar.component';
import { IUser } from '../../core/models/auth.model';
import { GetAllUser, GetLoggedInUser, UserState } from '../../store/UserState';
import { UserService } from '../../core/services/user.service';
import { isThisTypeNode } from 'typescript';
import { TaskBarComponent } from '../../shared/layout/task-bar/task-bar.component';
import { GetAllTask,  GetCompletedTasks,  TaskState } from '../../store/TaskState';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { BaseChartDirective, ThemeService } from 'ng2-charts';
import { UserDataComponent } from '../../shared/layout/user-data/user-data.component';

declare var data1:number;
declare var data2:number;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule,HeaderComponent,SideBarComponent,NoteItemComponent,TaskBarComponent,BaseChartDirective,UserDataComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  
  
  
  
 
  
  @Select(UserState.getLoggedUser) user$ !: Observable<IUser>
  @Select(TaskState.completedTask) completed$ !: Observable<ITask[]>
  @Select(TaskState.selectTask) tasks$ !: Observable<ITask[]>
  @Select(NoteState.selectNotes) notes$ !: Observable<INotes[]>
  @Select(NoteState.pinnedNotes) pins$ !: Observable<INotes[]>
  
  comp:number;
  currentYear: number;
  currentMonth: number;
  daysInMonth: any;
  chartdata:number[]=[2,5]
  
  constructor(private userService: UserService,private authService: AuthService, private store: Store,private dialogRef:MatDialog,private themeservice:ThemeService){
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    
    

  }
  generateCalendar(year: number, month: number) {
    const numberOfDays = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = Array.from({length: numberOfDays}, (_, i) => i + 1);
  
  }
  // Optional: Implement changing months
  goToNextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear += 1;
    } else {
      this.currentMonth += 1;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }
  goToPreviousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear -= 1;
    } else {
      this.currentMonth -= 1;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  ngOnInit(): void {
    
    this.generateCalendar(this.currentYear, this.currentMonth);
      this.notes$.subscribe({
        next:(value)=> {
          if (!value.length) {
            this.store.dispatch(new GetAllNote())
            
          }
          
          
            
        },
      });

      this.pins$.subscribe({
        next:(value)=> {
          if (!value.length) {
            this.store.dispatch(new GetPinnedNotes())
            
          }

          
          
            
        },
      });
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
          
          
          
            
        },
      });

    }
    barChartData = {
      labels: [
        'Completed',
        'Pending',
        
      ],
      datasets: [{
        label: `Vishwas's Task`,
        data: this.chartdata,
        backgroundColor: [
          'rgb(147, 51, 234)',
          'rgb(22, 27, 34)',
          
        ],
        hoverOffset: 4
      }]
    };

  
   
}
