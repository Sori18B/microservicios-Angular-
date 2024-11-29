import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RepresentativesList } from '../../Interfaces/Users/RepresentativesList';
import { PreliminaryTicketsList } from '../../Interfaces/Tickets/PreliminaryTicketsList';
import { CompleteTicket } from '../../Interfaces/Tickets/CompleteTicket';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../Services/users.service';
import { TicketsService } from '../../Services/tickets.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fill-ticket',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './fill-ticket.component.html',
  styleUrl: './fill-ticket.component.css',
})
export class FillTicketComponent implements OnInit {
  ListaRep: RepresentativesList[] = [];
  PreliminaryTicket: PreliminaryTicketsList[] = [];

  // Variables para capturar valores del formulario
  data:CompleteTicket = {
    PreliminaryID: 0, // se obtiene desde el local storage pero no se como definirlo aqui
    StatusID: 0,
    PriorityID: 0,
    RepID: 0
  }

  constructor(
    private usersService: UsersService,
    private ticketsService: TicketsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRepresentativesList();
    this.loadPreliminaryTicketDetails();
  }

  // Obtener lista de representantes
  getRepresentativesList(): void {
    this.usersService.getRepresentativesList().subscribe({
      next: (response) => {
        this.ListaRep = response;
      },
      error: (err) => {
        console.log('No se logró obtener la lista de reps:', err);
      },
    });
  }

  // Cargar detalles del ticket preliminar por ID
  loadPreliminaryTicketDetails(): void {
    const preliminaryID = localStorage.getItem('PreliminaryTicketID');
    if (preliminaryID) {
      this.ticketsService.getPreliminaryTicketById(Number(preliminaryID)).subscribe({
        next: (response) => {
          this.PreliminaryTicket = response;
          this.data.PreliminaryID = Number(preliminaryID); // Asignar el ID al objeto `data`
          localStorage.removeItem('PreliminaryTicketID'); // Limpiar localStorage
        },
        error: (err) => {
          console.log('Error al cargar el ticket preliminar:', err);
        },
      });
    } else {
      console.error('No se encontró PreliminaryTicketID en el localStorage.');
      this.router.navigate(['/preliminary-tickets-list']);
    }
  }

  onSubmit(): void {
    // Validar que todos los datos estén presentes
    if (!this.data.PreliminaryID || !this.data.StatusID || !this.data.PriorityID || !this.data.RepID) {
      console.error('Faltan datos para completar el ticket.');
      return;
    }

    // Llamar al servicio para completar el ticket
    this.ticketsService.CompleteTicket(this.data).subscribe({
      next: (response) => {
        alert("El ticket se completo con éxito");
        console.log('El ticket se completó correctamente:', response);
        this.router.navigate(['/TicketsPendientes']); // Redirigir después de completar
      },
      error: (err) => {
        alert("Error al completar el ticket");
        console.error('Error al completar el ticket:', err);
      },
    });
  }

  }


