import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.scss']
})
export class EditarAlumnoComponent implements OnInit {

  id_alumno;
  id_clase;
  nombre;
  apellidos;
  nacimiento;
  email;

  fechaActual = Date.now();
  formAlumno: FormGroup;

  private buildForm() {
    this.formAlumno = new FormGroup({
      nombre : new FormControl('', [Validators.required]),
      apellidos : new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  constructor(private alumnoService: AlumnoService, private http: HttpClient, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {

    this.id_alumno = this.alumnoService.alumno_id;
    this.id_clase = this.alumnoService.alumno_id_clase;
    this.nombre = this.alumnoService.alumno_nombre;
    this.apellidos = this.alumnoService.alumno_apellidos;
    this.nacimiento = this.alumnoService.alumno_nacimiento;
    this.email = this.alumnoService.alumno_email;

  }

  editarAlumno(){
    //Modificar alumno
    this.nombre = this.formAlumno.get('nombre').value;
    this.apellidos = this.formAlumno.get('apellidos').value;
    this.nacimiento = this.formAlumno.get('birthday').value;
    let day = this.nacimiento.getDate();
    let month = this.nacimiento.getMonth();
    let year = this.nacimiento.getFullYear();
    if(month < 10){
      month = "0"+(month+1);
    }
    if(day < 10){
      day = "0"+day;
    }
    let fecha = year+"-"+month+"-"+day;
    this.http.put<any>('http://localhost:3000/alumno/'+this.id_alumno, {
      id: this.id_alumno,
      id_clase: this.id_clase,
      nombre: this.nombre,
      apellidos: this.apellidos,
      nacimiento: fecha,
      email: this.email
    })
    .subscribe((datos) => {
      console.log(datos);
      this.router.navigate(['/lista']);
    })
  }

}
