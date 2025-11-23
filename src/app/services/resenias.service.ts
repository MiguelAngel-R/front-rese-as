import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';




export interface reseñasRequest{
  _id : String,
  nombreRestaurante : String,
  calificacion : number,
  reseña : String,
  fecha : Date,
  usuario: String
}

export interface reseñasresponse{
  token: reseñasRequest[]
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
        usuario,
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

  async crearReseña(reseña : reseñasRequest) : Promise<reseñasresponse>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    try {
      let respuesta = await this.http.post<reseñasresponse>(
        this.apiUrl + 'crear',
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


  async modificarReseña(reseña: reseñasRequest) : Promise<reseñasresponse>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    try {
      let respuesta = await this.http.post<reseñasresponse>(
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

  async eliminarReseña(id: string) : Promise<reseñasresponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    try {
      let respuesta = await this.http.post<reseñasresponse>(
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
