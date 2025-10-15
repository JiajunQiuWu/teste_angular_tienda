import { Component, inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { FavoritesService } from '../services/favorites.service';
import { NgFor, CurrencyPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgFor, CurrencyPipe],
  template: `
  <h2>Productos</h2>
  <div class="grid">
    <div class="card" *ngFor="let p of products">
      <img [src]="p.imageUrl || 'https://placehold.co/300x200'" alt="">
      <h4>{{p.name}}</h4>
      <small>{{p.category}}</small>
      <p>{{p.price | currency:'EUR'}}</p>
      <div class="row">
        <button (click)="add(p.id!)">Añadir</button>
        <button (click)="fav(p.id!)">❤</button>
      </div>
    </div>
  </div>
  `,
  styles:[`.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
  .card{border:1px solid #ddd;border-radius:8px;padding:10px}
  img{width:100%;height:140px;object-fit:cover}.row{display:flex;gap:.5rem}`]
})
export class ProductsListComponent {
  private ps = inject(ProductsService);
  private cart = inject(CartService);
  private favs = inject(FavoritesService);
  products:any[]=[];

  ngOnInit(){ this.ps.list().subscribe(p => this.products = p); }
  add(id:number){ this.cart.add(id).subscribe(); }
  fav(id:number){ this.favs.add(id).subscribe(); }
}
