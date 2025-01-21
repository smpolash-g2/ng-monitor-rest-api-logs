import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '', component: LayoutsComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', loadComponent() { return import('./pages/home/home.component').then(m => m.HomeComponent);}},

      // Add other child routes here (e.g., 'details', 'settings')
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogMonitorRoutingModule { }
