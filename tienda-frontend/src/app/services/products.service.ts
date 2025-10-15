import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private api = environment.apiUrl + '/api/products';

  constructor(private http: HttpClient) {}

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  create(p: Product): Observable<Product> {
    return this.http.post<Product>(`${this.api}/admin`, p);
  }

  update(id: number, p: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/admin/${id}`, p);
  }

  remove(id: number) {
    return this.http.delete(`${this.api}/admin/${id}`);
  }
}
