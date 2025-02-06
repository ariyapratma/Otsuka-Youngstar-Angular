import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { PagesRoutingModule } from './pages-routing.module';
import { MasterUserComponent } from './master-user/master-user.component';

@NgModule({
  declarations: [MasterUserComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ],
})
export class PagesModule {}
