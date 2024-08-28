import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GroupsListComponent } from "../../components/groups-list/groups-list.component";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CreateGroupComponent } from "../create-group/create-group.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    GroupsListComponent,
    RouterModule,
    CreateGroupComponent
],
})
export class HomeComponent implements OnInit {
  isModalOpen: boolean = false;
  constructor() { }

  handleCloseModal(message: string) { 
    this.isModalOpen = false;
    console.log('Modal closed with message:', message); 
  }

  openModel(){
    this.isModalOpen = true;
  }

  ngOnInit() {}

}
