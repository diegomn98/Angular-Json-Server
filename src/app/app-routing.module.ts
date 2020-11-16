import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAlumnoComponent } from './pages/add-alumno/add-alumno.component';
import { AddListaComponent } from './pages/add-lista/add-lista.component';
import { ComponentesComponent } from './pages/componentes/componentes.component';
import { EditarAlumnoComponent } from './pages/editar-alumno/editar-alumno.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaComponent } from './pages/lista/lista.component';
import { PruebaComponent } from './pages/prueba/prueba.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'componentes', component: ComponentesComponent},
  { path: 'prueba', component: PruebaComponent},
  { path: 'lista', component: ListaComponent},
  { path: 'addLista', component: AddListaComponent},
  { path: 'addAlumno', component: AddAlumnoComponent},
  { path: 'editarAlumno', component: EditarAlumnoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
