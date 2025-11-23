import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


export interface usuarioRequest {
  usuario: string,
  password: string
}


export interface usuarioResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:2409/api';
  private tokenKey = 'token';

  constructor(private http:HttpClient, private router:Router) { }


  async login(credentials: usuarioRequest) : Promise<usuarioResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    try {
      let response = await this.http.post<usuarioResponse>(
        this.apiUrl + '/login',
        credentials,
        {headers}
      ).toPromise();

      if (response) {
        this.setToken(response.token);
      }
      throw new Error("Bad Response");
    } catch (error) {
      throw error;
    }
  } 

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }  

  private setToken(token: string): void{
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken() : string | null {
    return localStorage.getItem(this.tokenKey);
  }

  autenticacion(): boolean {
    return !!this.getToken();
  }

}
