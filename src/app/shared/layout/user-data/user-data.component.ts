import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../core/models/auth.model';
import { INotes } from '../../../core/models/common.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { GetLoggedInUser, UserState } from '../../../store/UserState';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [RouterModule,CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export class UserDataComponent implements OnInit {
  @Select(UserState.getLoggedUser) user$ !:Observable<IUser>
  user:IUser
constructor(private router:Router,private store:Store,private authService:AuthService){}
ngOnInit(): void {
    this.store.dispatch(new GetLoggedInUser())
    this.user$.subscribe((res)=>{
      this.user=res
    })
}
logout(){
    
  this.authService.logout().subscribe({
    next(){}
  })
}
reroute(){
  this.router.navigate(['/dashboard'])
}
}
