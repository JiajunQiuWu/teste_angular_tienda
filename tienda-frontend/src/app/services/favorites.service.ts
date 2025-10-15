import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FavoriteItem } from '../models/favorite.models';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private api = environment.apiUrl + '/api/favorites';
  private _items = signal<FavoriteItem[]>([]);
  items = computed(() => this._items());

  constructor(private http: HttpClient) {}

  load() {
    return this.http.get<FavoriteItem[]>(this.api).pipe(tap(items => this._items.set(items)));
  }

  add(productId: number) {
    return this.http.post(`${this.api}/${productId}`, {})
      .pipe(tap(() => this.load().subscribe()));
  }

  remove(productId: number) {
    return this.http.delete(`${this.api}/${productId}`)
      .pipe(tap(() => this.load().subscribe()));
  }
}
