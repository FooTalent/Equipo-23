import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImageFormComponent } from './user-image-form.component';

describe('UserImageFormComponent', () => {
  let component: UserImageFormComponent;
  let fixture: ComponentFixture<UserImageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserImageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
