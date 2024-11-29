import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../Services/tickets.service';

import { MisTickets } from '../../Interfaces/Tickets/MisTickets';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tickets-cliente',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './tickets-cliente.component.html',
  styleUrls: ['./tickets-cliente.component.css'],
})
export class TicketsClienteComponent implements OnInit {
  Lista: MisTickets[] = []; // Lista de tickets

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    const clientID = this.ticketsService.getUserIDFromToken();
    if (clientID > 0) {
      this.getTicketListByClientID(clientID);
    }
  }

  getTicketListByClientID(clientID: number): void {
    this.ticketsService.getTicketListByClientID(clientID).subscribe({
      next: (result) => {
        this.Lista = result;
      },
      error: (err) => {
        console.error('Error al obtener la lista de tickets:', err);
      },
    });
  }
}
