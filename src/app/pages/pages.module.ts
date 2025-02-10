import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PagesRoutingModule } from './pages-routing.module';
import { MasterUserComponent } from './master-user/master-user.component';
import { MasterEditUserComponent } from './master-user/master-edit-user/master-edit-user.component';

@NgModule({
  declarations: [MasterUserComponent, MasterEditUserComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgApexchartsModule,
  ],
})
export class PagesModule {}
