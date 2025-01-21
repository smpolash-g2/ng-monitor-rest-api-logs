import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'apilogmonitor', loadChildren: () => import('./apilogmonitor/apilogmonitor.module').then(m => m.ApilogmonitorModule)},
  { path: 'home', loadComponent: () => import('./apilogmonitor/pages/home/home.component').then(m => m.HomeComponent) },
  { path: '', pathMatch: 'full', redirectTo: '/home' }, // Default route
];

