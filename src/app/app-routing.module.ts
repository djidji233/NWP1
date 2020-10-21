import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  // http://localhost:4200/
  { path: '', component: LoginComponent},
  // http://localhost:4200/home
  { path: 'home', component: UserListComponent},
  // http://localhost:4200/users
  { path: 'users/:id', component: UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
