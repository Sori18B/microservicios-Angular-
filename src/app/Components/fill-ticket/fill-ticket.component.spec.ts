import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillTicketComponent } from './fill-ticket.component';

describe('FillTicketComponent', () => {
  let component: FillTicketComponent;
  let fixture: ComponentFixture<FillTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FillTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
