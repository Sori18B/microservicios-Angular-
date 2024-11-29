import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

//Componente de inicio de sesión
import { LoginComponent } from './Components/login/login.component';

//Componente para registrar cuenta
import { SignupComponent } from './Components/signup/signup.component';

//Componente del home xd
import { HomeComponent } from './Components/home/home.component';

//Componente para creación de tickets preliminares (para clientes)
import { PreliminaryTicketsComponent } from './Components/preliminary-tickets/preliminary-tickets.component';

//Componente para el apartado 'Mis tickets'
import { TicketsClienteComponent } from './Components/tickets-cliente/tickets-cliente.component';

//Componente para listar los tickets preliminares
import { PreliminaryTicketsListComponent } from './Components/preliminary-tickets-list/preliminary-tickets-list.component';

//Componente para rellenar el ticket
import { FillTicketComponent } from './Components/fill-ticket/fill-ticket.component';

//Componente para obtener el listado de Tickets
import { TicketsListComponent } from './Components/tickets-list/tickets-list.component';

//Componente para actualizar datos de un ticket
import { UpdateTicketComponent } from './Components/update-ticket/update-ticket.component';

//Componente para página no encontrada
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

//Componente para ver el histoial de cambios de un ticket
import { TicketHistoryComponent } from './Components/ticket-history/ticket-history.component';

//Se definen los paths para las rutas
export const routes: Routes = [
  //Se define el 'path' y el 'componente' : { path: 'Inicio', component: InicioComponent },
  {path:'', pathMatch:'full' , component:LoginComponent}, //Ruta por defecto
  {path:'Registro', component:SignupComponent}, //Ruta para registro
  {path:'Inicio', component:HomeComponent},

  //CLIENTES
  {path:'TicketPreliminar', component:PreliminaryTicketsComponent}, //Creacion del ticket preliminar
  {path:'Mistickets', component:TicketsClienteComponent}, // Mis tickets
  //CLIENTES

  {path:'TicketsPendientes', component:PreliminaryTicketsListComponent}, //Lista de preliminares
  {path:'CompletarTicket', component:FillTicketComponent}, //Completar tickets
  {path:'ListaTickets', component:TicketsListComponent}, //Lista de tickets
  {path:'ActualizarTicket', component:UpdateTicketComponent}, //actualizar
  {path:'HistorialTicket', component:TicketHistoryComponent}, //ver hist. de cambios

  // Ruta de página no encontrada
  { path: '**', component: PageNotFoundComponent }
];

