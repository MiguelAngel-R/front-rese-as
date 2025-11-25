import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReseniasService, reseñasRequest, reseñasresponse } from '../../services/resenias.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-home',
  standalone : true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router : Router, private reseniasService : ReseniasService, private usuarioService : UsuarioService){}

  errorMensaje = '';
  isLoading = false;
  crear = false;
  eliminar = false;
  actualizar = false;
  idReseña : String = '';
  
  resenia : reseñasRequest = {
    _id : '',
    nombreRestaurante : '',
    calificacion : 0,
    resenia : '',
    fecha : '',
    usuario: '',
    __v : 0
  }


  resenias : reseñasresponse ={
    resenias : []
  }


  habilitar(){
    this.crear = true
  }

  logout(): void {
    this.usuarioService.logout();
  }

  async ngOnInit(): Promise<void>{
    this.listar();
  }

  async listar():Promise<void>{
    try {
      let usuario = localStorage.getItem("user");
      if (usuario) {
        this.resenias = (await this.reseniasService.listarReseñas(usuario));        
      }
      console.log(this.resenias);
    } catch (error) {
      console.log(error);
      //this.errorMensaje = error.error?.message || 'Error obteniendo los tipos de minerias';
    }
  }

  async crearResenia() : Promise<void>{
    if (!this.resenia.nombreRestaurante || this.resenia.calificacion === 0 || !this.resenia.resenia) {
      this.errorMensaje = 'Por favor completa todos los campos';
      return;
    }
    let usuario = localStorage.getItem("user");
    if (usuario) {
      this.resenia.usuario = usuario;      
    }
    this.isLoading = true;
    this.errorMensaje = '';

    try {
      let respuesta = (await this.reseniasService.crearReseña(this.resenia)).mensaje;
      if (respuesta) {
        this.errorMensaje = "Se creo la reseña con exito";
        this.resenia.nombreRestaurante = "";
        this.resenia.calificacion = 0;
        this.resenia.resenia = "";
        this.isLoading = false;
      }
      else{
        this.errorMensaje = "Error al crear la reseña";
      }
    } catch (error) {
      throw error;
    }
  }

  cerrarCrear(){
    this.crear = false;
    this.actualizar = false;
    this.listar();
  }

  abrirEliminar(id : String){
    this.idReseña = id;
    this.eliminar = true;
    console.log(id);
  }

  async eliminarResenia(){
    try {
      let respuesta = (await this.reseniasService.eliminarReseña(this.idReseña)).mensaje;
      if (respuesta) {
        this.resenias.resenias = this.resenias.resenias.filter(item => item._id !== this.idReseña);
        this.idReseña = '';
        this.eliminar = false;
      }
      else{
        this.errorMensaje = "Error al crear la reseña";
      }
    } catch (error) {
      throw error;
    }    
  }

  abrirResenia(resenia : reseñasRequest){
    this.actualizar = true;
    this.resenia._id = resenia._id;
    this.resenia.nombreRestaurante = resenia.nombreRestaurante;
    this.resenia.calificacion = resenia.calificacion;
    this.resenia.resenia = resenia.resenia;
    this.resenia.usuario = resenia.usuario;
  }

  async actualizarResenia() : Promise<void>{
    if (!this.resenia.nombreRestaurante || this.resenia.calificacion === 0 || !this.resenia.resenia) {
      this.errorMensaje = 'Por favor completa todos los campos';
      return;
    }    
    this.isLoading = true;
    this.errorMensaje = '';

    try {
      let respuesta = (await this.reseniasService.modificarReseña(this.resenia)).mensaje;
      if (respuesta) {
        this.errorMensaje = "Se actualizo con exito la reseña";
        this.resenia._id = '';
        this.resenia.nombreRestaurante = "";
        this.resenia.calificacion = 0;
        this.resenia.resenia = "";
        this.resenia.fecha = '';
        this.isLoading = false;
      }
      else{
        this.errorMensaje = "Error al crear la reseña";
        this.isLoading = false;
      }
    } catch (error) {
      throw error;
    }
  }



  
}
