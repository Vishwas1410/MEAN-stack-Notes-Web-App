import { Routes } from '@angular/router';
import { MasterComponent } from './shared/layout/master/master.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotesComponent } from './pages/notes/notes.component';
import { CreateComponent } from './pages/create/create.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TrashComponent } from './pages/trash/trash.component';
import { UserDataComponent } from './shared/layout/user-data/user-data.component';

export const routes: Routes = [
    {
        path:'',
        component: MasterComponent, 
        children:[
            {path:'',
            component: LoginComponent,canActivate:[guestGuard]},
            {path:'register',
            component: RegisterComponent, canActivate:[authGuard]},
            {path:'profile',
            component: UserDataComponent, canActivate:[authGuard]},
            {path:'dashboard',
            component: DashboardComponent,canActivate:[authGuard]},
            {path:'notes',
            component: NotesComponent,canActivate:[authGuard]},
            {path:'notes/:id',
            component: NotesComponent,canActivate:[authGuard]},
            {path:'create',
            component: CreateComponent},
            {path:'tasks',
            component: TasksComponent},
            
            {path:'trash',
            component:TrashComponent},

            
        ],
        
    }
];
