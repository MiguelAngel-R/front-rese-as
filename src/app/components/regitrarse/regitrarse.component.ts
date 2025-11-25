import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { usuarioRequest, usuarioResponse, UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-regitrarse',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './regitrarse.component.html',
  styleUrl: './regitrarse.component.css'
})
export class RegitrarseComponent {
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


  async onSummit() : Promise<void>{
    if (!this.usuarioRequest.usuario || !this.usuarioRequest.password) {
      this.errorMensaje = 'Por favor completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMensaje = '';

    try {
      let resultado = (await this.usuarioService.validarCredenciales(this.usuarioRequest)).mensaje;  
      if (!resultado) {
        let resultado2 = (await this.usuarioService.registrarse(this.usuarioRequest)).mensaje;
        if (resultado2) {
          this.router.navigate(['/login']);
        }
      }
      else{
        this.errorMensaje = "El usuario ya esta en uso, por favor ingresa otro";
      }

      
    } catch (error: any) {
      this.errorMensaje = error.error?.message || 'Error en el login. Verifica tus credenciales.';
    } finally {
      this.isLoading = false;
    }    
  }


}
