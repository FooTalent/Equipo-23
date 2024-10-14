import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopPanelComponent } from './desktop-panel.component';

describe('DesktopPanelComponent', () => {
  let component: DesktopPanelComponent;
  let fixture: ComponentFixture<DesktopPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
