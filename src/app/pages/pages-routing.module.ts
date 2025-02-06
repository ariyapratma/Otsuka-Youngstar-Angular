import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterUserComponent } from './master-user/master-user.component';

const routes: Routes = [
  { path: 'master-user', component: MasterUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
