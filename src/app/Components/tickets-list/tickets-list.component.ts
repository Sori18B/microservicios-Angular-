import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Total } from '../../Interfaces/Tickets/Total';
import { TicketList } from '../../Interfaces/Tickets/TicketList';
import { CommonModule } from '@angular/common';
import { TicketsService } from '../../Services/tickets.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css'
})
export class TicketsListComponent {

  TicketsTotales = 0;
  TicketsAbiertos = 0;
  TicketsEnProceso = 0;
  TicketsCerrados = 0;

  TicketsList:TicketList[] = [];

  constructor(
    private ticketsService: TicketsService,
    private router:Router

  ){}

  ngOnInit(){
    this.getTicketsTotal();
    this.getOpenTicketsTotal();
    this.getTicketsInProcessTotal();
    this.getTicketsCerrados();
    this.getTicketsList()
  }

  getTicketsTotal(): void{
    let repID = this.UserID();
    this.ticketsService.getTicketsTotal(repID).subscribe({
      next:(response) => {
        this.TicketsTotales = response;
        // console.log("El total de tickets es: ", response);
      },
      error: (err)  => {
        console.log("No se pudo recueperar el total", err);
      }
    });
  }
  getOpenTicketsTotal(){
    let repID = this.UserID();
    this.ticketsService.getOpenTicketsTotal(repID).subscribe({
      next: (response) => {
        this.TicketsAbiertos = response;
        // console.log("Tickets abiertos: ", response);
      },
      error:(err) => {
        console.log("No se pudo obtener el total", err);
      }
    });
  }

  getTicketsInProcessTotal(){
    let repID = this.UserID();
    this.ticketsService.getTicketsInProcessTotal(repID).subscribe({
      next: (response) => {
        this.TicketsEnProceso = response;
        // console.log("Hay ", response, " tickets en proceso");
      },
      error: (err) => {
        console.log("No se pudo obtener el total", err);
      }
    });
  }

  getTicketsCerrados(){
    let repID = this.UserID();
    this.ticketsService.getClosedTicketsTotal(repID).subscribe({
      next: (response) => {
        this.TicketsCerrados = response;
        // console.log("Hay ", response, " tickets cerrados");
      },
      error: (err) => {
        console.log("No se pudo obtener el total", err);
      }
    });
  }

  getTicketsList() {
    let repID = this.UserID();
    this.ticketsService.getTicketList(repID).subscribe({
      next: (response) => {
        this.TicketsList = response;
        // console.log('Lista de tickets:', response);
      },
      error: (err) => {
        console.error('No se pudo obtener la lista de tickets:', err);
      }
    });
  }

  UserID(){
    // Obtener el token JWT del local storage
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('No se encontró el JWT en el local storage.');
      return;
    }
    // else{
    //   console.log("el token recuperado es: ", token)
    // }
    const decodedToken: any = jwtDecode(token);
    const repID = decodedToken.UserID;
    if (!repID) {
      console.error('No se pudo obtener el UserID del token JWT.');
      return;
    }
    // else{
    //   console.log("el id es: ", repID)
    // }
    return repID;
  }

  // FilterByStatus(){
  //   this.ticketsService.
  // }

  // FilterByPriority(){

  // }

  RedirectToUpdateTicket(id:number): void {
    localStorage.setItem('TicketID', id.toString());
    this.router.navigate(['/ActualizarTicket'])
  }

  RedirectToTicketHistory(id: number): void {
    localStorage.setItem('TicketID', id.toString());
    this.router.navigate(['/HistorialTicket'])
  }

}
