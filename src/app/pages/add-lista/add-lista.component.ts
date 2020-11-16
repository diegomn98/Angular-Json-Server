import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-lista',
  templateUrl: './add-lista.component.html',
  styleUrls: ['./add-lista.component.scss']
})
export class AddListaComponent implements OnInit {

  headers: any;
  mockUrl: any;
  nombreClase: any;
  nAlumnos: any;

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  constructor(private http: HttpClient, private router: Router) {
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  ngOnInit(): void {
  }

  claseControl = new FormControl('', [
    Validators.required
  ]);

  addClase() {
    this.nombreClase = this.claseControl.value;
    this.nAlumnos =  0;

    this.mockUrl = 'http://localhost:3000/lista';
    return this.http.post<any>(this.mockUrl, {
        id: "",
        clase: this.nombreClase,
        alumnos: this.nAlumnos
      }).subscribe((datos) => {
        console.log(datos);
        this.router.navigate(['/prueba']);
      });

  }

}
