import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GroupService } from 'src/app/services/group/group.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { AddGroupMemberComponent } from '../add-group-member/add-group-member.component';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, AddGroupMemberComponent],
})
export class ViewGroupComponent implements OnInit {

  groupId: string = '';
  groupDetails:any;
  isAddMemberDialogOpen: boolean = false;
  constructor(
    private loaderServe: LoaderService,
    private route: ActivatedRoute,
    private groupServe: GroupService
  ) {
    this.groupId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  async getGroupDetails(): Promise<void> {
    try {
      this.loaderServe.showLoading();
      const data = await this.groupServe.getGroupDetailsById(this.groupId);
      this.groupDetails = data;
      console.log(data, 'group data');
    } catch (error) {
      console.log(error);
    } finally {
      this.loaderServe.hideLoading();
    }
  }

  handleCloseModal(message: string) {
    this.isAddMemberDialogOpen = false;
    console.log('Modal closed with message:', message);
  }


  openAddMemberDialog() {
    this.isAddMemberDialogOpen = true;
  }

  ngOnInit() {
    this.getGroupDetails();
  }
}
