import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddGroupMemberComponent } from './add-group-member.component';

describe('AddGroupMemberComponent', () => {
  let component: AddGroupMemberComponent;
  let fixture: ComponentFixture<AddGroupMemberComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddGroupMemberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddGroupMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
