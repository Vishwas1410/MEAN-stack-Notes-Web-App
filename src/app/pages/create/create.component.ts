import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from '../../core/services/note.service';
import { UserService } from '../../core/services/user.service';
import { INotes } from '../../core/models/common.model';
import { IUser } from '../../core/models/auth.model';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  @Input() data!:IUser
  constructor(private dialogref: MatDialog,private ns: NoteService,private us: UserService,private fb:FormBuilder){}
  addnote!: FormGroup;
  ngOnInit(): void {
    this.addnote=this.fb.group({
      title:new FormControl('',[Validators.required]),
      body:new FormControl('',[Validators.required])
    })
  }
  submitNote(){
    
    if(this.addnote.valid){
      
      this.ns.addnote(this.addnote.value).subscribe({
       next:()=>{}
          
      })
      this.dialogref.closeAll()
      
    }
    
    }

  
  closenote(){
     this.dialogref.closeAll()
  }

  
}
