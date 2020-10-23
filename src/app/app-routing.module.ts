import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { LoginComponent } from './components/login/login.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {GroupsComponent} from './components/groups/groups.component';
import {GroupDetailsComponent} from './components/group-details/group-details.component';

const routes: Routes = [
  // http://localhost:4200/
  { path: '', component: LoginComponent},
  // http://localhost:4200/home
  { path: 'home', component: UserListComponent},
  // http://localhost:4200/users/{id}
  { path: 'users/:id', component: UserDetailsComponent},
  // http://localhost:4200/users/edit/{id}
  { path: 'users/edit/:id', component: UserEditComponent},
  // http://localhost:4200/groups
  { path: 'groups', component: GroupsComponent},
  // http://localhost:4200/groups/{groupName}
  { path: 'groups/:groupName', component: GroupDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
