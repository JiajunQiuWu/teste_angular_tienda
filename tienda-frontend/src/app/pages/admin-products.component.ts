import { Component, inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Product } from '../models/product.models';

@Component({
  standalone: true,
  imports:[FormsModule, NgFor],
  template: `
  <h2>Admin Productos</h2>
  <form (ngSubmit)="save()" class="card">
    <input [(ngModel)]="form.name" name="name" placeholder="Nombre" required>
    <input [(ngModel)]="form.category" name="category" placeholder="Categoría">
    <input [(ngModel)]="form.price" name="price" type="number" step="0.01" placeholder="Precio" required>
    <input [(ngModel)]="form.imageUrl" name="imageUrl" placeholder="Imagen URL">
    <textarea [(ngModel)]="form.description" name="description" placeholder="Descripción"></textarea>
    <button>{{form.id ? 'Actualizar' : 'Crear'}}</button>
    <button type="button" (click)="reset()">Limpiar</button>
  </form>

  <table class="table">
    <tr><th>Id</th><th>Nombre</th><th>Precio</th><th></th></tr>
    <tr *ngFor="let p of products">
      <td>{{p.id}}</td><td>{{p.name}}</td><td>{{p.price}}</td>
      <td>
        <button (click)="edit(p)">Editar</button>
        <button (click)="del(p.id!)">Eliminar</button>
      </td>
    </tr>
  </table>`,
  styles:[`.table{width:100%;border-collapse:collapse;margin-top:1rem}
  .table th,.table td{border:1px solid #ddd;padding:.5rem}`]
})
export class AdminProductsComponent {
  private ps = inject(ProductsService);
  products: Product[] = [];
  form: Product = { name:'', price:0 };

  ngOnInit(){ this.load(); }
  load(){ this.ps.list().subscribe(r => this.products = r); }
  edit(p: Product){ this.form = { ...p }; }
  reset(){ this.form = { name:'', price:0 }; }
  save(){
    const { id, ...dto } = this.form;
    const obs = id ? this.ps.update(id!, this.form) : this.ps.create(dto as Product);
    obs.subscribe(()=>{ this.reset(); this.load(); });
  }
  del(id:number){ this.ps.remove(id).subscribe(()=> this.load()); }
}
