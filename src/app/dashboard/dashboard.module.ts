import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './dashboard.routing';
import { material } from './material/index';
import { componets } from './components/index';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [...componets],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    ...material
  ]
})
export class DashboardModule { }
