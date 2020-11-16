import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {

  dataSource: any;
  dataLength: any;
  displayedColumns: any[] = [
    "numero",
    "clase",
    "alumnos",
    "button"
  ];

  constructor(private dataService: DatabaseService, private listaService: ListaService) { }

  ngOnInit(): void {
    this.dataService.getListas().subscribe((res: any[]) => {
      this.dataSource = res;
      this.dataLength = res.length;
      console.log(this.dataSource);
    });
  }

  enviarDatosLista(id, clase, alumnos){
    this.listaService.lista_id = id;
    this.listaService.lista_clase = clase;
    this.listaService.lista_nAlumnos = alumnos;
  }
}
