import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatModalQrComponent } from './chat-modal-qr.component';

describe('ChatModalQrComponent', () => {
  let component: ChatModalQrComponent;
  let fixture: ComponentFixture<ChatModalQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatModalQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatModalQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
