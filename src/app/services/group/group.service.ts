import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Group } from 'src/app/models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private group: Group

  constructor() {
    this.group = new Group([], "404")
  }

  public getGroupName(): string {
    return this.group.groupName
  }

  public getMembers(): User[] {
    return this.group.users
  }

  public addMember(user: User) {
    if(!this.group.users.some(u => { return u.firstName === user.firstName })) { 
      // Ako .some vrati true, taj clan vec postoji u grupi i necemo ga dodati
      this.group.users.push(user)
    }
  }
  
  public clearGroup(): void {
    this.group.users = []
  }
}
