import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  datosManual: any;

  constructor(private dataService: DatabaseService) {}

  ngOnInit(): void {
    this.dataService.getDatosManual().subscribe((res: any[]) => {
      this.datosManual = res;
      console.log(this.datosManual);
    });
  }

}
