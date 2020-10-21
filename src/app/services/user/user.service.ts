import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Injectable omogucava dependancy injection https://angular.io/guide/dependency-injection
// providedIn oznacava na kom nivou ce biti dostupna instanca ovog servisa
// 'root' znaci da je UserService singleton na nivou cele aplikacije
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersUrl = 'http://localhost:8080/users'
  private authorization = "Bearer "+localStorage.getItem("jwt")
  private users: Observable<User[]>

  constructor(private http: HttpClient) {
      // this.users = [new User(0, "Pera", "Peric", "12334567890"),
      //               new User(1, "Laza", "Lazic", "0987654321")]
   }

   public getUsers(): Observable<User[]> {
     return this.users
   }

   public fetchUsers(): Observable<User[]> {
     this.users = this.http.get<User[]>(this.usersUrl, {
       params: {

       }, headers: {
          Authorization: this.authorization
       }
     })
     return this.users
   }

   public removeUser(id: number){
      let user = this.http.delete(this.usersUrl + '/' + id, {
        params: {}, headers: {
          Authorization: this.authorization
        }
      });
     return user;
   }
}
