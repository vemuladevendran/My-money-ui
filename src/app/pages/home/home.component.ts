import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GroupsListComponent } from '../../components/groups-list/groups-list.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CreateGroupComponent } from '../create-group/create-group.component';
import { GroupService } from 'src/app/services/group/group.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { TokenService } from 'src/app/services/token/token.service';
import { AuthService } from 'src/app/services/auth/auth.service';

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
    CreateGroupComponent,
  ],
})
export class HomeComponent implements OnInit {
  isModalOpen: boolean = false;
  groupListDetails: any[] = [];
  profileData: any;
  constructor(
    private groupServe: GroupService,
    private toastServe: ToastService,
    private loaderServe: LoaderService,
    private tokenServe: TokenService,
    private authServe: AuthService
  ) {}

  handleCloseModal(message: string) {
    this.isModalOpen = false;
    console.log('Modal closed with message:', message);
    if (message === 'success') this.getGroupDetails();
  }

  openModel() {
    this.isModalOpen = true;
  }

  // get group details
  async getGroupDetails(): Promise<void> {
    try {
      const res: any = await this.groupServe.getAllActiveGroups();
      console.log(res);
      this.groupListDetails = res;
    } catch (error) {
      console.log(error);
      this.toastServe.presentToast('Fail to load groups');
    } 
  }

  async getProfileData(): Promise<void> {
    try {
      const data = await this.tokenServe.getTokenData();
      this.profileData = data;
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    this.authServe.logout();
  }

  ngOnInit() {
    this.getProfileData();
    this.getGroupDetails();
  }
}
