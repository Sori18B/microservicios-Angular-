import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Para *ngIf y ngClass
import { AuthenticationService } from './../../Services/authentication.service';
//Para redirigir XD
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //Variables para las credenciales
  email: string = '';
  password: string = '';

  //aqui iria el servicio ed autenticacionxd
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ){}

   //Metodo para el login
   Login(): void {
    this.authenticationService.Login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.authenticationService.setToken(response.token);
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/Inicio']);
      },
      error: (err: any) => {
        console.error('Error en el inicio de sesón', err);
      }
    });
  }

  SignUp(){
    this.router.navigate(['/Registro']);
  };
}
