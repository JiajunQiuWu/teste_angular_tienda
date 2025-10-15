import { Component, inject } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { NgFor } from '@angular/common';

@Component({
  standalone:true,
  imports:[NgFor],
  template: `
  <h2>Favoritos</h2>
  <div *ngFor="let f of favs.items()" class="row">
    <div class="grow">{{f.product.name}}</div>
    <button (click)="rm(f.product.id!)">Eliminar</button>
  </div>`,
  styles:[`.row{display:flex;gap:1rem;align-items:center;border-bottom:1px solid #eee;padding:.5rem 0}
  .grow{flex:1}`]
})
export class FavoritesComponent {
  favs = inject(FavoritesService);
  ngOnInit(){ this.favs.load().subscribe(); }
  rm(id:number){ this.favs.remove(id).subscribe(); }
}
