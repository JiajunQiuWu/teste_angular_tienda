import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../services/orders.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common'; // 👈 añade esto

@Component({
  standalone:true,
  imports:[FormsModule, CurrencyPipe], // 👈 añade CurrencyPipe aquí
  template: `
  <h2>Checkout</h2>
  <form (ngSubmit)="pay()" class="card">
    <input [(ngModel)]="shippingAddress" name="shippingAddress" placeholder="Dirección" required>
    <select [(ngModel)]="paymentMethod" name="paymentMethod">
      <option value="CARD">Tarjeta</option>
      <option value="COD">Contra reembolso</option>
    </select>
    <button>Pagar {{cart.total() | currency:'EUR'}}</button>
  </form>`
})
export class CheckoutComponent {
  private orders = inject(OrdersService);
  cart = inject(CartService);
  private router = inject(Router);

  shippingAddress='Mi calle 123';
  paymentMethod='CARD';

  pay(){
    this.orders.checkout({shippingAddress:this.shippingAddress,paymentMethod:this.paymentMethod})
      .subscribe(()=>{ this.cart.clear().subscribe(); this.router.navigate(['/']); });
  }
}
