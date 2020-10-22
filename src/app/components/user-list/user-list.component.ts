import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: User[]

  // Pomocu parametra u konstruktoru injektujemo UserService instancu u UserListComponent
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe(users => {
      console.log(users)
      this.users = users
    })
  }

  deleteUser(id: number) {
    //let index;
    this.userService.removeUser(id).subscribe(user => {
      console.log(user)
      //index = this.users.indexOf(user)
    })
    this.userService.fetchUsers().subscribe(users => {
      console.log(users)
      this.users = users
    })
    //this.users.splice(index,1)
  }

}
