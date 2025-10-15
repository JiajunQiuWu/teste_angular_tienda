import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { NgFor, CurrencyPipe } from '@angular/common';

@Component({
  standalone: true,
  imports:[NgFor, CurrencyPipe],
  template: `
  <h2>Mi carrito</h2>
  <div *ngFor="let i of cart.items()" class="row">
    <div class="grow">{{i.product.name}}</div>
    <div>{{i.product.price | currency:'EUR'}}</div>
    <div>
      <button (click)="dec(i.product.id!)">-</button>
      {{i.quantity}}
      <button (click)="inc(i.product.id!)">+</button>
    </div>
    <button (click)="remove(i.product.id!)">Quitar</button>
  </div>
  <div class="total">Total: {{cart.total() | currency:'EUR'}}</div>
  <a routerLink="/checkout" class="btn">Ir a pagar</a>
  `,
  styles:[`.row{display:flex;gap:1rem;align-items:center;border-bottom:1px solid #eee;padding:.5rem 0}
  .grow{flex:1}.total{margin-top:1rem;font-weight:600}`]
})
export class CartComponent {
  cart = inject(CartService);
  ngOnInit(){ this.cart.load().subscribe(); }
  inc(id:number){ this.cart.add(id,1).subscribe(); }
  dec(id:number){ this.cart.setQty(id, Math.max(1, this.qtyOf(id)-1)).subscribe(); }
  remove(id:number){ this.cart.remove(id).subscribe(); }
  qtyOf(id:number){ return this.cart.items().find(i=>i.product.id===id)?.quantity || 1; }
}
