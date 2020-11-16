import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  lista_id;
  lista_clase;
  lista_nAlumnos;
  mockUrl: any;

  dataSource: any;
  dataLength: any;
  displayedColumns: any[] = [
    "numero",
    "nombre",
    "apellidos",
    "nacimiento",
    "email",
    "button1",
    "button2"
  ];

  constructor(private dataService: DatabaseService, private http: HttpClient, private listaService: ListaService, private alumnoService: AlumnoService, private router: Router) { }

  ngOnInit(): void {
    this.lista_id = this.listaService.lista_id;
    this.lista_clase = this.listaService.lista_clase;
    this.lista_nAlumnos = this.listaService.lista_nAlumnos;

    this.dataService.getAlumnos(this.lista_id).subscribe((res: any[]) => {
      this.dataSource = res;
      this.dataLength = res.length;
      console.log(this.dataSource);
    });
  }

  borrarAlumno(id_alumno){
    this.mockUrl = 'http://localhost:3000/alumno/';
    this.http.delete<any>(this.mockUrl+id_alumno)
    .subscribe((datos) => {
        console.log(datos);
        this.router.navigate(['/prueba']);
        this.http.put<any>('http://localhost:3000/lista/'+this.lista_id, {
            id: this.lista_id,
            clase: this.listaService.lista_clase,
            alumnos: this.listaService.lista_nAlumnos-1
          })
          .subscribe((datos) => {
            console.log(datos);
            this.router.navigate(['/lista']);
          });
    });
  }

  editarAlumno(id, id_clase, nombre, apellidos, nacimiento, email){
    this.alumnoService.alumno_id = id;
    this.alumnoService.alumno_id_clase = id_clase;
    this.alumnoService.alumno_nombre = nombre;
    this.alumnoService.alumno_apellidos = apellidos;
    this.alumnoService.alumno_nacimiento = nacimiento;
    this.alumnoService.alumno_email = email;
    this.router.navigate(['/editarAlumno']);
  }

}
