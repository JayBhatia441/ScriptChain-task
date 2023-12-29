import { Component, OnInit } from '@angular/core';
import { ListServiceService } from '../list-service.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private listService: ListServiceService) { }

  ngOnInit() {
    this.listService.getUsers().subscribe(
      data => this.users = data,
      error => console.error('Error:', error)
    );
  }
}
