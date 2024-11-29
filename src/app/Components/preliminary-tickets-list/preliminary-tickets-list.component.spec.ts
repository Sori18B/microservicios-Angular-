import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreliminaryTicketsListComponent } from './preliminary-tickets-list.component';

describe('PreliminaryTicketsListComponent', () => {
  let component: PreliminaryTicketsListComponent;
  let fixture: ComponentFixture<PreliminaryTicketsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreliminaryTicketsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreliminaryTicketsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
