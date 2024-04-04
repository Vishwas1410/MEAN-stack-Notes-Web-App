import { Component, Input, OnInit, inject } from '@angular/core';
import { INotes, ITask, Itaskprogress } from '../../../core/models/common.model';
import { TaskService } from '../../../core/services/task.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-bar',
  standalone: true,
  imports: [],
  templateUrl: './task-bar.component.html',
  styleUrl: './task-bar.component.scss'
})

export class TaskBarComponent{
  @Input() data!:ITask
  
  
  
  constructor(private ts: TaskService,private fb:FormBuilder,private router: Router){}
  completeTask(id:string,isCompleted:boolean){
    const data={
      completed:isCompleted
    }
    this.ts.completeTask(data,id).subscribe({
      next:()=>{}
    })
    this.router.navigate([this.router.url])
  }
  
}
