import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  private messages: string[] = [];
  private user: any;
  private privilege = false;

  constructor(private router: Router) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user === null) {
      this.router.navigateByUrl('/');
    }

    if (this.user.type === 'super') {
      this.privilege = true;
    }
  }

  ngOnInit() {
  }

}
