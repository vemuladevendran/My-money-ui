import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonCard } from "@ionic/angular/standalone";

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
  imports:[CommonModule, IonicModule],
  standalone: true,
})
export class GroupsListComponent  implements OnInit {
@Input() groupData: any
  constructor() { }

  ngOnInit() {}

}
