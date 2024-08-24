import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GroupsListComponent } from "../../components/groups-list/groups-list.component";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    GroupsListComponent,
    RouterModule
  ],
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
