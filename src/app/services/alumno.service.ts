import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  alumno_id;
  alumno_id_clase;
  alumno_nombre;
  alumno_apellidos;
  alumno_nacimiento;
  alumno_email;

  constructor() { }
}
