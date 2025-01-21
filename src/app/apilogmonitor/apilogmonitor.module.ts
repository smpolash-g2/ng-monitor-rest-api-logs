import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogMonitorRoutingModule } from './apilogmonitor-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [LayoutsComponent],
  imports: [
    CommonModule,
    LogMonitorRoutingModule,
    TableModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    FluidModule,
    HomeComponent
  ],
})
export class ApilogmonitorModule { }
