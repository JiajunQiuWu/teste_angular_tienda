import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CartItem } from '../models/cart.models';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private api = environment.apiUrl + '/api/cart';
  private _items = signal<CartItem[]>([]);

  items = computed(() => this._items());
  count = computed(() => this._items().reduce((acc, i) => acc + i.quantity, 0));
  total = computed(() => this._items().reduce((acc, i) => acc + i.product.price * i.quantity, 0));

  constructor(private http: HttpClient) {}

  load() {
    return this.http.get<CartItem[]>(this.api).pipe(tap(items => this._items.set(items)));
  }

  add(productId: number, qty: number = 1) {
    return this.http.post<CartItem>(`${this.api}/add/${productId}?qty=${qty}`, {})
      .pipe(tap(() => this.load().subscribe()));
  }

  setQty(productId: number, qty: number) {
    return this.http.put<CartItem>(`${this.api}/set/${productId}?qty=${qty}`, {})
      .pipe(tap(() => this.load().subscribe()));
  }

  remove(productId: number) {
    return this.http.delete(`${this.api}/remove/${productId}`)
      .pipe(tap(() => this.load().subscribe()));
  }

  clear() {
    return this.http.delete(`${this.api}/clear`)
      .pipe(tap(() => this._items.set([])));
  }

  fetchTotal(): Observable<number> {
    return this.http.get<{total:number}>(`${this.api}/total`).pipe(map(r => r.total));
  }
}
