import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  

  const tokenService = inject(TokenService)
  const router = inject(Router);
  tokenService.isAuthentication.subscribe({
    next(value){
      if(!value){
        router.navigate([''])
      }
    }
  })
  return true;
};
