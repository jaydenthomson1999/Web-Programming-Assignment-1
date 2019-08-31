import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

interface Get {
  ok: boolean;
  users: any;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private url = 'http://localhost:3000/api/get-users';
  private group;
  private channel;
  private users;

  constructor(private http: HttpClient, private router: Router,
    private route: ActivatedRoute) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user === null) {
      this.router.navigateByUrl('/');
    }

    if (JSON.parse(sessionStorage.getItem('user')).type !== 'super') {
      router.navigateByUrl('/chat-room');
    }
    this.get_users();
   }

  ngOnInit() {

  }

  get_users() {
    const data = new Promise((resolve, reject) => {
      this.http.get<Get>(this.url).subscribe(
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

}
