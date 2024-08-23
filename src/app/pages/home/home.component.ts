import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GroupsListComponent } from "../../components/groups-list/groups-list.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, GroupsListComponent],
  standalone: true,
})
export class HomeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
