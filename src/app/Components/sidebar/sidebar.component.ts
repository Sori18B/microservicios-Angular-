import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../Services/authentication.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  menuItems: any[] = [];

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.menuItems = this.authenticationService.getMenuFromToken();
  }

  CerrarSesion(): void {
    this.authenticationService.logout();
  }
}
