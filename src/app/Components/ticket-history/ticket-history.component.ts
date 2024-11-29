import { Component, OnInit } from '@angular/core';
import { TicketHistoryList } from '../../Interfaces/Tickets/TicketHistoryList';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TicketsService } from '../../Services/tickets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-history',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './ticket-history.component.html',
  styleUrl: './ticket-history.component.css'
})
export class TicketHistoryComponent implements OnInit{

  TicketID!: number;

  HistoryList: TicketHistoryList[] = [];

  constructor(
    private ticketsService: TicketsService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getTicketID();
    this.getHistoryList();
  }

  getTicketID(): number | null {
    const id = localStorage.getItem('TicketID');
    if (id && !isNaN(+id)) {
      this.TicketID = +id;
      return +id;
    } else {
      console.error('No se encontró un Ticket ID válido en el local storage.');
      return null;
    }
  }

  getHistoryList(){
    this.ticketsService.getTicketHistoryList(Number(this.TicketID)).subscribe({
      next: (response) => {
        this.HistoryList = response;
        console.log("Lista recuperada", response);
      },
      error: (err) =>{
        console.log("No se recupero la lista", err);
      }
    })
  }

  onSubmit(){
    localStorage.removeItem('TicketID');
    this.router.navigate(['/ListaTickets']);
  }

}
