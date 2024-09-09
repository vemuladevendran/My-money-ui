import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { GroupService } from 'src/app/services/group/group.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-group-member',
  templateUrl: './add-group-member.component.html',
  styleUrls: ['./add-group-member.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class AddGroupMemberComponent implements OnInit {
  @Input() modelStatus: boolean = false;
  @Input() groupId = '';
  @Output() closeModal = new EventEmitter<string>();
  filters: any;
  userForm: FormGroup; // Reactive form
  usersData: any[] = [];
  newMembersList: any[] = [];

  constructor(
    private authServe: AuthService,
    private fb: FormBuilder,
    private groupServe: GroupService,
    private loaderServe: LoaderService,
    private toastServe: ToastService,
  ) {
    this.userForm = this.fb.group({
      userId: [''], // Initialize userId control
    });

    this.userForm.valueChanges.pipe(debounceTime(800)).subscribe(() => {
      this.filters = this.userForm?.value;
      this.getUsers(this.filters);
    });
  }

  ngOnInit() {}

  onWillDismiss(event: Event) {
    this.modelStatus = false;
    this.closeModal.emit('modal dismissed');
  }

  close(modelMessage: string = 'closed') {
    this.modelStatus = false;
    this.closeModal.emit(modelMessage);
  }

  async getUsers(filters: any): Promise<void> {
    try {
      const data = await this.authServe.getUsersList(filters);
      // Check if data is an array and map it
      if (Array.isArray(data)) {
        // Initialize 'isAdded' flag to false for each user
        this.usersData = data.map((user: any) => ({ ...user, isAdded: false }));
      } else {
        this.usersData = []; // Handle non-array case
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Add new member
  addNewMembers(user: any) {
    // Clear input form
    this.userForm.reset();
    
    // Add user to the newMembersList if not already added
    if (!this.newMembersList.some((u) => u.user_id === user.user_id)) {
      this.newMembersList.push(user);
      // Mark user as added in usersData
      this.usersData = this.usersData.map((u) =>
        u.user_id === user.user_id ? { ...u, isAdded: true } : u
      );
    }
  }

  // Remove member from the newMembersList
  removeMember(user: any) {
    // Remove the user from newMembersList
    this.newMembersList = this.newMembersList.filter(
      (u) => u.user_id !== user.user_id
    );
    // Mark the user as not added in usersData
    this.usersData = this.usersData.map((u) =>
      u.user_id === user.user_id ? { ...u, isAdded: false } : u
    );
  }

async addMembersToGroup():Promise<void>{
  try {
    if(this.groupId === '') return;
    this.loaderServe.showLoading();
    console.log(this.newMembersList, '============');
    
    const data = await this.groupServe.addGroupMembers(this.newMembersList, this.groupId);
    console.log(data);
    
  } catch (error) {
    console.log(error);
    this.toastServe.presentToast('Fail to Add Members')
  }finally{
    this.loaderServe.hideLoading();
  }
}
}
