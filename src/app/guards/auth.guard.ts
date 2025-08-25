import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verificar si hay un usuario logueado
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
      // Usuario está logueado, permitir acceso
      return true;
    } else {
      // Usuario no está logueado, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}

