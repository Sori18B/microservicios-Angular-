import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TicketsService } from '../../Services/tickets.service';
import { HttpClient } from '@angular/common/http';
import { PreliminaryTicketsList } from '../../Interfaces/Tickets/PreliminaryTicketsList';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-preliminary-tickets-list',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './preliminary-tickets-list.component.html',
  styleUrl: './preliminary-tickets-list.component.css'
})
export class PreliminaryTicketsListComponent {
    //Lista con los tickets preliminares
    Lista: PreliminaryTicketsList[] = [];

    constructor(
      private router: Router,
      private ticketsService: TicketsService  ,
      private httpClient: HttpClient
    ){}

    ngOnInit(): void {
      this.getPreliminaryTicketsList();
    }

    getPreliminaryTicketsList() : void{
      this.ticketsService.getPreliminaryTicketsList().subscribe({
        next: (result) => {
          this.Lista = result;
        },
        error: (err) => {
          console.log(err);
        }});
    }

    onSubmit(preliminaryID: number): void {
      localStorage.setItem('PreliminaryTicketID', preliminaryID.toString());
      this.router.navigate(['/CompletarTicket']);
    }


}
