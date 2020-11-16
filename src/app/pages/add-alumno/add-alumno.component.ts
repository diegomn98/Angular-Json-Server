import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.scss']
})
export class AddAlumnoComponent implements OnInit {

  id_clase: any;
  nombre: any;
  apellidos: any;
  nacimiento: any;
  email: any;
  mockUrl: any;
  fechaActual = Date.now();
  nombreClase: any;
  formAlumno: FormGroup;

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  private buildForm() {
    this.formAlumno = new FormGroup({
      nombre : new FormControl('', [Validators.required]),
      apellidos : new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  constructor(private http: HttpClient, private router: Router, private listaService: ListaService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.id_clase = this.listaService.lista_id;
  }

  addAlumno(){
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
    this.email = this.formAlumno.get('email').value;
    this.mockUrl = 'http://localhost:3000/alumno';
    //Añadir Alumno a Clase
    this.http.post<any>(this.mockUrl, {
        id: "",
        id_clase : this.id_clase,
        nombre: this.nombre,
        apellidos: this.apellidos,
        nacimiento: fecha,
        email: this.email
      }).subscribe((datos) => {
        console.log(datos);
        //Modificar Nº de alumnos de la clase
        this.http.put<any>('http://localhost:3000/lista/'+this.id_clase, {
            id: this.id_clase,
            clase: this.listaService.lista_clase,
            alumnos: this.listaService.lista_nAlumnos+1
          })
          .subscribe((datos) => {
            console.log(datos);
            this.router.navigate(['/lista']);
          });
      });

    }
}
