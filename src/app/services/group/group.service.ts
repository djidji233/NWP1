import {Injectable} from '@angular/core';
import {User} from 'src/app/models/user.model';
import {Group} from 'src/app/models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groups: Group[] = [];

  //private group: Group

  constructor() {
    this.groups.push(new Group([], '1'));
    this.groups.push(new Group([], '2'));
    this.groups.push(new Group([], '3'));
    //this.group = this.groups[0];
  }

  // public getGroupName(): string {
  //   return this.group.groupName
  // }
  //
  // public getMembersOfGroup(groupName: string): User[] {
  //   return this.group.users
  // }
  //
  // public addMember(user: User) {
  //   if(!this.group.users.some(u => { return u.firstName === user.firstName })) {
  //     // Ako .some vrati true, taj clan vec postoji u grupi i necemo ga dodati
  //     this.group.users.push(user)
  //   }
  // }
  //
  // public clearGroup(): void {
  //   this.group.users = []
  // }

  public addGroup(groupName: string) {
    if (!this.groups.some(g => {return g.groupName === groupName;})) {
      // ako ne postoji dodajemo je u listu grupa
      this.groups.push(new Group([], groupName));
    } else {
      console.log("group name must be unique")
    }
    console.log(this.groups);
  }

  public getAllGroups() {
    return this.groups
  }

  public addUserToGroup(user: User, group: Group){
    let groupNeeded = this.groups.find(gr => gr.groupName === group.groupName)

    if(!groupNeeded.users.some(u => {return u.id === user.id;})) {
      groupNeeded.users.push(user)
    }
    console.log(groupNeeded)
  }

  public getUsersFromGroup(grName: string){
    let groupNeeded = this.groups.find(gr => gr.groupName === grName)
    return groupNeeded.users
  }

  public removeUserFromGroups(id: number){
    for(let gr of this.groups){
      gr.users = gr.users.filter(usr => usr.id !== id)
    }
  }


}
