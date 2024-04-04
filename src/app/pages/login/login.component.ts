declare var google:any;
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';

import { FormGroup,FormControl,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HeaderComponent } from '../../shared/layout/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,HeaderComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
  private router = inject(Router)
  loginform!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService){

  }
  ngOnInit(): void {
    this.loginform=this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })

    google.accounts.id.initialize({
      client_id: '321115997285-3p6rh9osl5o8dgma71fekkbo2npirsd2.apps.googleusercontent.com',
      apiKey: 'AIzaSyBFhUgoYxMBM85FZS5uNha8Nw-ZolIDfNY',
      callback: (resp: any)=> this.handleLogin(resp)
        
      
    })
    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme: 'filled_blue',
      shape: 'rectangle',
      size: 'large',
      width: 250,
    })
  }
  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]));
  }
handleLogin(response: any){
  if(response){
    //decode token
    console.log(response.access_token);
    
    const payload = this.decodeToken(response.credential)
    //store in localstorage
    sessionStorage.setItem("loggedInUser",JSON.stringify(payload))
     const email = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
     const name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
     const profilepic = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
     this.authService.googlelogin({email,name,profilepic}).subscribe({
      next:()=>{}
    })
    
    
  }
}
 onSubmit(){
  if(this.loginform.valid){
    console.log(this.loginform.value);
    this.authService.login(this.loginform.value).subscribe({
     next:()=>{}
        
    })
    
  }
  else{
    this.loginform.markAllAsTouched
  }
  }
}
