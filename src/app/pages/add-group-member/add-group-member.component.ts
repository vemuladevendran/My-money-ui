import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-group-member',
  templateUrl: './add-group-member.component.html',
  styleUrls: ['./add-group-member.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class AddGroupMemberComponent implements OnInit {
  @Input() modelStatus: boolean = false;
  @Output() closeModal = new EventEmitter<string>();
  filters: any;
  userForm: FormGroup; // Reactive form
  usersData: any = [];
  constructor(
    private authServe: AuthService,
    private fb: FormBuilder // FormBuilder for reactive form
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
      this.usersData = data;
      console.log(data, '==========');
    } catch (error) {
      console.log(error);
    }
  }
}
