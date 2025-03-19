import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansChartComponent } from './plans-chart.component';

describe('PlansChartComponent', () => {
  let component: PlansChartComponent;
  let fixture: ComponentFixture<PlansChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlansChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlansChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
