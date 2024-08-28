import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { GroupService } from 'src/app/services/group/group.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class CreateGroupComponent {
  @Input() modelStatus: boolean = false;
  @Output() closeModal = new EventEmitter<string>(); 
  createGroupForm!: FormGroup;
  selectedGroupType: string = 'Others'; // Default group type

  groupTypes = [
    { name: 'Trip', icon: 'airplane-outline' },
    { name: 'Home', icon: 'home-outline' },
    { name: 'Party', icon: 'beer-outline' },
    { name: 'Movie', icon: 'videocam-outline' },
    { name: 'Couple', icon: 'heart-outline' },
    { name: 'Others', icon: 'newspaper-outline' },
  ];

  defaultGroupImages = [
    { name: 'Trip', img: '/assets/group-icons/trip.png' },
    { name: 'Home', img: '/assets/group-icons/home.png' },
    { name: 'Party', img: '/assets/group-icons/party.png' },
    { name: 'Movie', img: '/assets/group-icons/movie.png' },
    { name: 'Couple', img: '/assets/group-icons/couple.png' },
    { name: 'Others', img: '/assets/group-icons/others.png' },
  ];

  constructor(
    private fb: FormBuilder,
    private groupServe: GroupService,
    private toastServe: ToastService
  ) {
    this.createGroupForm = this.fb.group({
      name: ['', Validators.required],
      group_type: [this.selectedGroupType, Validators.required], // Default to 'Others'
      group_default_image: [
        this.defaultGroupImages.find(
          (img) => img.name === this.selectedGroupType
        )?.img,
      ],
    });
  }

  close(modelmessage: string = 'closed') {
    this.modelStatus = false;
    const message = modelmessage; 
    this.closeModal.emit(message); 
  }
  onWillDismiss(event: Event) {
    this.modelStatus = false;
    this.closeModal.emit();
  }

  // Method to handle chip selection
  selectGroupType(type: string) {
    this.selectedGroupType = type;
    const defaultImage = this.defaultGroupImages.find(
      (img) => img.name === type
    )?.img;
    this.createGroupForm.patchValue({
      groupType: type,
      group_default_image: defaultImage,
    });
  }

  // Method to handle image selection from the gallery (to be implemented)
  async selectImage() {
    // Example using Capacitor plugins:
    // const image = await Camera.getPhoto({...});
    // const croppedImage = await ImageCrop.crop({...});
    // this.createGroupForm.patchValue({ group_default_image: croppedImage });
  }

  // Method to submit the form
  async onSubmit(): Promise<void> {
    try {
      if (this.createGroupForm.valid) {
        const formData = this.createGroupForm.value;
        const result = await this.groupServe.createGroup(formData);
        console.log(result);
        this.toastServe.presentToast('Successfully created');
        this.close();
      }
    } catch (error) {
      console.log(error);
      this.toastServe.presentToast('Fail to create Group');
    }
  }
}
