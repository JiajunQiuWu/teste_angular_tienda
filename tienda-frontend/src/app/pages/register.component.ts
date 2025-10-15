import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports:[FormsModule],
  template: `
  <h2>Crear cuenta</h2>
  <form (ngSubmit)="submit()" #f="ngForm" class="card">
    <input name="username" [(ngModel)]="username" placeholder="Nombre" required>
    <input name="email" [(ngModel)]="email" placeholder="Email" required>
    <input name="password" type="password" [(ngModel)]="password" placeholder="Contraseña" required>
    <button [disabled]="f.invalid">Registrarme</button>
  </form>`
})
export class RegisterComponent {
  private auth = inject(AuthService); private router = inject(Router);
  username=''; email=''; password='';
  submit(){
    this.auth.register({username:this.username,email:this.email,password:this.password})
      .subscribe(()=> this.router.navigate(['/']));
  }
}
