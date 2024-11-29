import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TicketsService } from '../../Services/tickets.service';
import { CreatePreliminaryTicket } from '../../Interfaces/Tickets/CreatePreliminaryTicket';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preliminary-tickets',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './preliminary-tickets.component.html',
  styleUrl: './preliminary-tickets.component.css'
})
export class PreliminaryTicketsComponent {
  data: CreatePreliminaryTicket = {
    Title: '',
    Description: '',
    ClientID: 0,
  };

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.setClientID();
  }

  private setClientID(): void {
    const UserID = this.ticketsService.getUserIDFromToken();
    if (UserID) {
      this.data.ClientID = UserID;
    }
  }

  onSubmit(): void {
    this.ticketsService.CreatePreliminaryTicket(this.data).subscribe({
      next: (response) => {
        alert('Ticket creado con éxito');
        this.data = { Title: '', Description: '', ClientID: this.data.ClientID };
      },
      error: (err) => {
        console.error('Error al crear el ticket:', err);
        alert('Ocurrió un error al crear el ticket. Intente nuevamente.');
      },
    });
  }
}
