import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterUserComponent } from './master-user/master-user.component';
import { MasterEditUserComponent } from './master-user/master-edit-user/master-edit-user.component';

const routes: Routes = [
  { path: 'master-user', component: MasterUserComponent },
  {
    path: 'master-user/master-edit-user/:id',
    component: MasterEditUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
