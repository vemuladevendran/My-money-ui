import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GroupService } from 'src/app/services/group/group.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ViewGroupComponent implements OnInit {
  groupId: string = '';
  groupDetails:any;
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

  ngOnInit() {
    this.getGroupDetails();
  }
}
