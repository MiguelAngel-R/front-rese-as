import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: UsuarioService, private router: Router) {}

  canActivate(): boolean {
    // Si el usuario YA está autenticado, redirigir al home
    if (this.authService.autenticacion()) {
      this.router.navigate(['/home']);
      return false; // No permite acceder al login
    }    
    // Si NO está autenticado, permite acceder al login
    return true;
  }
}