import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinLoadingBlurComponent } from './spin-loading-blur.component';

describe('SpinLoadingBlurComponent', () => {
  let component: SpinLoadingBlurComponent;
  let fixture: ComponentFixture<SpinLoadingBlurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinLoadingBlurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpinLoadingBlurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
