import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GroupsListComponent } from "../../components/groups-list/groups-list.component";
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    GroupsListComponent
  ],
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
