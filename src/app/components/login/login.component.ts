import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { usuarioRequest, usuarioResponse, UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMensaje = '';
  isLoading = false;

  constructor(private router : Router, private usuarioService : UsuarioService){}

  usuarioRequest : usuarioRequest ={
    usuario: '',
    password: ''
  }

  usuarioResponse : usuarioResponse = {
    token : ''
  }


  ngOnInit(): void {
    if (this.usuarioService.autenticacion()) {
      this.router.navigate(['/home']);
    }
  }

  async onSummit() : Promise<void>{
    if (!this.usuarioRequest.usuario || !this.usuarioRequest.password) {
      this.errorMensaje = 'Por favor completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMensaje = '';

    try {
      await this.usuarioService.login(this.usuarioRequest);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.errorMensaje = error.error?.message || 'Error en el login. Verifica tus credenciales.';
    } finally {
      this.isLoading = false;
    }    
  }

  

}
