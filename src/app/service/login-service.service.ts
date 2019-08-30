import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Post {
  ok: boolean;
  username: string;
  email: string;
  type: string;
  groupList: string[];
  adminGroupList: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private url = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post<Post>(this.url, {username, password}).subscribe(
        res => {
          console.log(res);
          if (res.ok) {
            delete res.ok;
            sessionStorage.setItem('user', JSON.stringify(res));
          }
          resolve(res.ok);
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          reject(err.error);
        }
      );
    });
  }
}
