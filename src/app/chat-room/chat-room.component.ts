import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { resolve } from 'dns';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Put {
  add: boolean;
}

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  private messages: string[] = [];
  private user: any;
  private privilege = false;
  private modalTitle;
  private modalInput;

  private groupUrl = 'http://localhost:3000/api/add-group';
  private channelUrl = 'http://localhost:3000/api/add-group';

  constructor(private router: Router, private http: HttpClient) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user === null) {
      this.router.navigateByUrl('/');
    }

    if (this.user.type === 'super' || this.user.type === 'group admin') {
      this.privilege = true;
    }
  }

  ngOnInit() {
  }

  addGroupModal() {
    this.modalTitle = 'Add Group';
  }

  addChannelModal() {
    this.modalTitle = 'Add Channel';
  }

  modalAdd() {
    if (this.modalTitle === 'Add Group') {
      // add group api
      const data = new Promise((resolve, reject) => {
        this.http.put<Put>(this.groupUrl,
          { groupName: this.modalInput,
            username: (JSON.parse(sessionStorage.getItem('user')).username)})
            .subscribe(
            res => {
              if (res.add) {
                resolve(res.add);
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

      data.then(bool => {
        if (bool) {
          // get user groups
        }
        else {
          alert('Couldn\'t add group');
        }
      });
    }
    else {
      // add channel api
    }
  }
}
