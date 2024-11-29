import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../Services/register.service';
import { RegisterUser } from '../../Interfaces/Users/RegisterUser';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  user: RegisterUser={
    Name:     '',
    Email:    '',
    Password: '',
    PhoneNumber: '',
    RoleID:   3
  }

  constructor (
    private router: Router,
    private registerService: RegisterService,
  ) {}

  onSubmit() {
    console.log(this.user);
    this.registerService.RegisterUser(this.user).subscribe({
      next: (response) => {
        console.log('Usuario registrado con éxito:', response);
        alert('¡Registro exitoso!');
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        alert('Hubo un error al registrarte. Intenta nuevamente.');
      }
    });
  }

  RedirectToLogin(){
    this.router.navigate(['/'])
  }
}
