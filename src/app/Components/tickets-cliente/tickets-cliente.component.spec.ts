import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsClienteComponent } from './tickets-cliente.component';

describe('TicketsClienteComponent', () => {
  let component: TicketsClienteComponent;
  let fixture: ComponentFixture<TicketsClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
