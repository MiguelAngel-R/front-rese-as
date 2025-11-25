import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';




export interface reseñasRequest{
  _id : String,
  nombreRestaurante : String,
  calificacion : number,
  resenia : String,
  fecha : string,
  usuario: String,
  __v : number
}

export interface reseñasresponse{
  resenias: reseñasRequest[]
}

export interface mensajeResenia{
  mensaje : boolean
}


@Injectable({
  providedIn: 'root'
})
export class ReseniasService {
  
  private apiUrl = 'http://localhost:2409/api';

  constructor(private http : HttpClient, private router : Router) { }


  async listarReseñas(usuario : string) : Promise<reseñasresponse>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    try {
      let respuesta = await this.http.post<reseñasresponse>(
        this.apiUrl + '/listar',
        {"usuario" : usuario},
        {headers}
      ).toPromise();

      if (respuesta) {
        return respuesta;
      }
      throw new Error("Bad Response");
    } catch (error) {
      throw error;
    }
  }

  async crearReseña(reseña : reseñasRequest) : Promise<mensajeResenia>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    try {
      let respuesta = await this.http.post<mensajeResenia>(
        this.apiUrl + '/crear',
        reseña,
        {headers}
      ).toPromise();

      if(respuesta){
        return respuesta;
      }
      throw new Error ("Bad Response");
    } catch (error) {
      throw error;
    }
  }


  async modificarReseña(reseña: reseñasRequest) : Promise<mensajeResenia>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    try {
      let respuesta = await this.http.post<mensajeResenia>(
        this.apiUrl + '/modificar',
        reseña,
        {headers}
      ).toPromise();

      if (respuesta) {
        return respuesta;
      }
      throw new Error ("Bad Response");
    } catch (error) {
      throw error;
    }
  }

  async eliminarReseña(id: String) : Promise<mensajeResenia> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    try {
      let respuesta = await this.http.post<mensajeResenia>(
        this.apiUrl + '/eliminar',
        {id: id},
        {headers}
      ).toPromise();

      if (respuesta ) {
        return respuesta;
      }

      throw new Error ("Bad Response");

    } catch (error) {
      throw error;
    }
  }

}
