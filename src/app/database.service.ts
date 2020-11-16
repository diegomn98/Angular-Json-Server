import { Injectable } from '@angular/core';
import { USE_MOCKS, API_URL } from './constants/constants';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  headers: any;

  constructor(private http: HttpClient) {
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  // tslint:disable-next-line: typedef
  getDatosManual() {
    const url = `${API_URL}inicio`;
    if (!USE_MOCKS) {
      return this.http.get(url, { headers: this.headers });
    } else {
      return this.http.get('http://localhost:3000/inicio');
    }
  }

  getListas() {
    const url = `${API_URL}lista`;
    if (!USE_MOCKS) {
      return this.http.get(url, { headers: this.headers });
    } else {
      return this.http.get('http://localhost:3000/lista');
    }
  }

  getAlumnos(id_clase) {
    const url = `${API_URL}alumno`;
    if (!USE_MOCKS) {
      return this.http.get(url, { headers: this.headers });
    } else {
      return this.http.get('http://localhost:3000/alumno?id_clase='+id_clase);
    }
  }


}
