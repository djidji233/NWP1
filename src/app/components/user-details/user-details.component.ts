import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user = new User(-1,"","")
  public groupMembers: User[]

  constructor(private userService: UserService,
              private groupService: GroupService,
              private activatedRoute: ActivatedRoute) {
                this.groupMembers = []
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'))
      console.log(id)

      this.userService.getUsers().subscribe((users: User[]) => {
        console.log(users)
        this.user = users.filter(user => user.id === id)[0]
      })
    })
  }

  public addToGroup(user: User) {
    this.groupService.addMember(user)
  }

  public showGroup() {
    this.groupMembers = this.groupService.getMembers()
  }
  public clearGroup() {
    this.groupService.clearGroup()
    this.showGroup()
  }
}
