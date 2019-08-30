import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Post {
  ok: boolean;
  username: string;
  email: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private url = 'http:/localhost:3000/login';

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    this.http.post<Post>(this.url, {username, password}).subscribe(
      res => {
        if (res.ok) {
          sessionStorage.setItem('user',
          JSON.stringify({
            username: res.username,
            email: res.email,
            type: res.type
          }));
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }
}
