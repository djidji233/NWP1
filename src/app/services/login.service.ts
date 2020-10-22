import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Credentials } from '../models/credentials.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnDestroy {

  private readonly loginUrl = 'http://localhost:8080/login'

  constructor(private http: HttpClient) { }

  ngOnDestroy(): void {
    this.logout()
  }

  login(credentials) {
    let httpParams = new HttpParams()
    httpParams.append("username", credentials.username)
    return this.http.get(this.loginUrl, {
      params: {
        username: credentials.username,
        password: credentials.password,
        duration: credentials.duration
      }, headers: {

      }
    }).pipe(map( (responseData: Credentials) => {
        console.log(responseData)
        localStorage.setItem("jwt", responseData.JWT)
        localStorage.setItem("username", responseData.username)
        //localStorage.setItem("time", new Date().toLocaleString("22/10/2016 11:49"))
    }))
  }

  postExample(data){
    this.http.post(this.loginUrl, data)
  }

  logout(){
    localStorage.removeItem("jwt")
  }
}
