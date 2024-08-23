import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
  imports:[CommonModule],
  standalone: true,
})
export class GroupsListComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
