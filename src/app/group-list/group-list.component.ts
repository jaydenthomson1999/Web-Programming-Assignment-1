import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Delete {
  delete: boolean;
}

interface Get {
  ok: boolean;
  groupList: any[];
  adminGroupList: any[];
}

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  private user;
  private channelList;
  private delUrl = 'http://localhost:3000/api/del-group';
  private getGroupUrl = 'http://localhost:3000/api/get-groups';
  private adminGroupList;
  private groupList;

  constructor(private http: HttpClient) {
    // this.user = JSON.parse(sessionStorage.getItem('user'));
    this.getGroups();
  }

  ngOnInit() {
  }

  selectGroup(groupName: string) {
    for( let i = 0; i < this.groupList.length; i++) {
      if (this.groupList[i].groupName === groupName) {
        this.channelList = this.groupList[i].channels;
        break;
      }
    }
  }

  getGroups() {
    const data = new Promise<any>((resolve, reject) => {
      this.http.post<Get>(this.getGroupUrl, {
        username: (JSON.parse(sessionStorage.getItem('user')).username)
      }).subscribe(
        res => {
          if (res.ok) {
            resolve(res);
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
      this.adminGroupList = json.adminGroupList;
      this.groupList = json.groupList;
    });
  }

  deleteGroup(groupName: string) {
    // delete group
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {username: this.user.username, groupName}
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

    del.then(bool => {
      if (bool) {
        this.getGroups();
      } else {
        alert('Couldn\'t delete user');
      }
    });
  }

}
