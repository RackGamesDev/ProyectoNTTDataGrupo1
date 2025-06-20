import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authComponent } from './auth/auth';

const routes: Routes = [
  {
    path: '',
    component: authComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { 

}
