import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from 'src/app/services/user/user.service';
import {User} from 'src/app/models/user.model';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from 'src/app/services/group/group.service';
import {Group} from '../../models/group.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user = new User(-1, '', '');
  public groups = [];

  constructor(private userService: UserService,
              private groupService: GroupService,
              private activatedRoute: ActivatedRoute) {
    this.groups = this.groupService.getAllGroups();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'));
      console.log(id);

      this.userService.getUsers().subscribe((users: User[]) => {
        console.log(users);
        this.user = users.filter(user => user.id === id)[0];
      });
    });
  }

  chosenGroup(group: Group) {
    this.groupService.addUserToGroup(this.user, group);
    let el: HTMLElement = document.getElementById('dropdownContent');
    el.hidden= true;
  }

  showDropdown(){
    let el: HTMLElement = document.getElementById('dropdownContent');
    el.hidden= false;
  }

}
