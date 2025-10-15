import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  template: `
  <nav class="nav">
    <a routerLink="/">Urbanwear</a>
    <span class="grow"></span>
    <a routerLink="/products">Productos</a>
    <a routerLink="/cart">Carrito</a>
    <a routerLink="/favorites">Favoritos</a>
    <a *ngIf="auth.isAdmin()" routerLink="/admin/products">Admin</a>
    <ng-container *ngIf="auth.isLoggedIn(); else loginLink">
      <span class="email">{{auth.email()}}</span>
      <button class="btn" (click)="logout()">Salir</button>
    </ng-container>
    <ng-template #loginLink>
      <a routerLink="/login">Entrar</a>
      <a routerLink="/register">Crear cuenta</a>
    </ng-template>
  </nav>
  `,
  styles: [`.nav{display:flex;gap:.75rem;align-items:center;padding:10px;border-bottom:1px solid #ddd}
  .grow{flex:1} .btn{padding:6px 10px} .email{opacity:.7;margin-right:.5rem}`]
})
export class NavbarComponent {
  auth = inject(AuthService); router = inject(Router);
  logout(){ this.auth.logout(); this.router.navigate(['/']); }
}
