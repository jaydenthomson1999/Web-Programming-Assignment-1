import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  private user;

  constructor() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user);
  }

  ngOnInit() {
  }

}
