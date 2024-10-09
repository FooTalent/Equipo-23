import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstanceComponent } from './create-instance.component';

describe('CreateInstanceComponent', () => {
  let component: CreateInstanceComponent;
  let fixture: ComponentFixture<CreateInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInstanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
