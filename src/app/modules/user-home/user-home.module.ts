import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { UserHomeRoutingModule } from './user-home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    UserHomeRoutingModule,
    UserHomeComponent
  ]
})
export class UserHomeModule { }
