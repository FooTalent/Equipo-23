import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBotComponent } from './product-bot.component';

describe('ProductBotComponent', () => {
  let component: ProductBotComponent;
  let fixture: ComponentFixture<ProductBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
