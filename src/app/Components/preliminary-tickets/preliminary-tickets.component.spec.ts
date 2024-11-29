import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreliminaryTicketsComponent } from './preliminary-tickets.component';

describe('PreliminaryTicketsComponent', () => {
  let component: PreliminaryTicketsComponent;
  let fixture: ComponentFixture<PreliminaryTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreliminaryTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreliminaryTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
