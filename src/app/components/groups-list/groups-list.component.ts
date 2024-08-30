import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private router: Router,
  ) { }


  viewGroup(id: string) {
    this.router.navigate([`/view-group/${id}`]);
  }

  ngOnInit() {}

}
