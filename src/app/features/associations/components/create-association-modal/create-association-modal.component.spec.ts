import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssociationModalComponent } from './create-association-modal.component';

describe('CreateAssociationModalComponent', () => {
  let component: CreateAssociationModalComponent;
  let fixture: ComponentFixture<CreateAssociationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAssociationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAssociationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
