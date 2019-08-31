import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

interface Get {
  ok: boolean;
  users: any;
}

interface Delete {
  delete: boolean;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private getUrl = 'http://localhost:3000/api/get-users';
  private delUrl = 'http://localhost:3000/api/del-user';
  private user;
  private group;
  private channel;
  private users;

  constructor(private http: HttpClient, private router: Router) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user === null) {
      this.router.navigateByUrl('/');
    }

    if (JSON.parse(sessionStorage.getItem('user')).type !== 'super' &&
        JSON.parse(sessionStorage.getItem('user')).type !== 'group admin') {
      router.navigateByUrl('/chat-room');
    }

    this.user = JSON.parse(sessionStorage.getItem('user'));

    this.get_users();


   }

  ngOnInit() {

  }

  get_users() {
    const data = new Promise((resolve, reject) => {
      this.http.get<Get>(this.getUrl).subscribe(
        res => {
          if (res.ok) {
            resolve(res.users.users);
          } else {
            resolve(false);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          reject(err.error);
        }
      );
    });

    data.then(json => {
      this.users = json;
    });
  }

  delUser(username) {
    console.log(username);

    // delete user
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {username}
    };

    const del = new Promise((resolve, reject) => {
      this.http.delete<Delete>(this.delUrl, httpOptions).subscribe(
        res => {
          if (res.delete) {
            resolve(res.delete);
          } else {
            resolve(false);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          reject(err.error);
        }
      );
    });

    // get users again
    del.then(bool => {
      if (bool) {
        this.get_users();
      } else {
        alert('Couldn\'t delete user');
      }
    });
  }

}
