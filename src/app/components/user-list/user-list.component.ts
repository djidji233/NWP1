import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from 'src/app/models/user.model';
import {UserService} from 'src/app/services/user/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Group} from '../../models/group.model';
import {GroupService} from '../../services/group/group.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: User[];
  public user = new User(-1, '', '');
  public group = new Group([], '');
  public userAddForm: FormGroup;
  public groupAddForm: FormGroup;

  // Pomocu parametra u konstruktoru injektujemo UserService instancu u UserListComponent
  constructor(private userService: UserService,
              private groupService: GroupService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.validateAddUserForm(this.user.firstName, this.user.lastName);
    this.validateAddGroupForm(this.group.groupName);
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.userService.fetchUsers().subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }

  validateAddUserForm(first: string, last: string) {
    this.userAddForm = this.formBuilder.group({
      userFirstName: [first, Validators.required],
      userLastName: [last, Validators.required]
    });
  }

  validateAddGroupForm(name: string) {
    this.groupAddForm = this.formBuilder.group({
      groupName: [name, Validators.required]
    });
  }

  deleteUser(id: number) {
    this.userService.removeUser(id).subscribe(user => {
      console.log(user);
      this.fetch();
    });
  }

  public get userFirstName() {
    return this.userAddForm.get('userFirstName');
  }

  public get userLastName() {
    return this.userAddForm.get('userLastName');
  }

  public get groupName() {
    return this.groupAddForm.get('groupName');
  }

  public submitAddUserForm(credentials) {
    console.log('submit add user form');
    this.userService.addUser(credentials).subscribe(data => {
      this.fetch();
      this.validateAddUserForm('', '');
    });
  }

  public submitAddGroupForm(credentials) {
    console.log(credentials.groupName);
    this.groupService.addGroup(credentials.groupName);
    this.validateAddGroupForm('');
  }

}
