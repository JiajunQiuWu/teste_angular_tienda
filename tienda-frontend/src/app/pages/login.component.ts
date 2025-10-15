import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports:[FormsModule, NgIf],
  template: `
  <h2>Iniciar sesión</h2>
  <form (ngSubmit)="submit()" #f="ngForm" class="card">
    <input name="email" [(ngModel)]="email" placeholder="Email" required>
    <input name="password" type="password" [(ngModel)]="password" placeholder="Contraseña" required>
    <button [disabled]="f.invalid">Entrar</button>
    <p *ngIf="error" class="error">{{error}}</p>
  </form>`,
  styles:[`.card{display:flex;flex-direction:column;gap:.5rem;max-width:320px}`]
})
export class LoginComponent {
  private auth = inject(AuthService); private router = inject(Router);
  email=''; password=''; error='';
  submit(){
    this.auth.login({email:this.email,password:this.password}).subscribe({
      next: ()=> this.router.navigate(['/']),
      error: (e)=> this.error = e?.error || 'Error de login'
    });
  }
}
