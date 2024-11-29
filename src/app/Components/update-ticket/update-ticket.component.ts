import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../Services/tickets.service';
import { UpdateTicket } from '../../Interfaces/Tickets/UpdateTicket';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { TicketList } from '../../Interfaces/Tickets/TicketList';

@Component({
  selector: 'app-update-ticket',
  standalone: true,
  imports: [SidebarComponent, FormsModule,CommonModule],
  templateUrl: './update-ticket.component.html',
  styleUrl: './update-ticket.component.css'
})
export class UpdateTicketComponent implements OnInit{

  TicketsList:TicketList[] = [];

  data: UpdateTicket = {
    ticketID : 0,
    statusID : 0,
    priorityID: 0,
    userID: 0,
    changeDescription : ''

  }

  constructor(
    private ticketsService: TicketsService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadTicketDetails();
    this.UserID();
  }

  loadTicketDetails(): void {
    const TicketID = this.getTicketID();
    if (TicketID !== null) {
      this.ticketsService.getTicketListById(TicketID).subscribe({
        next: (response) => {
          this.TicketsList = [response];
        },
        error: (err) => {
          console.error('Error al cargar el ticket:', err);
        },
      });
    }
  }

  getTicketID(): number | null {
    const id = localStorage.getItem('TicketID');
    if (id && !isNaN(+id)) {
      this.data.ticketID = +id;
      return +id;
    } else {
      console.error('No se encontró un Ticket ID válido en el local storage.');
      return null;
    }
  }


  UserID(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.data.userID = decodedToken?.UserID || 0;
        if (!this.data.userID) {
          console.error('No se encontró un UserID válido en el token JWT.');
        }
      } catch (error) {
        console.error('Error al decodificar el JWT:', error);
      }
    } else {
      console.error('No se encontró el JWT en el local storage.');
    }
  }


  onSubmit(){
    this.ticketsService.UpdateTicket(this.data).subscribe({
      next: (response) => {
        console.log("Los datos se actualizaron correctamente", response)
        this.router.navigate(['/ListaTickets']);
        localStorage.removeItem('TicketID');
      },
      error: (err) => {
        console.log("Los datos no se actualizaron ", err)
      }
    });
  }


}
