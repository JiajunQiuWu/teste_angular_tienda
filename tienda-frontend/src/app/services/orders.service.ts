import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CheckoutRequest, Order } from '../models/order.models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private api = environment.apiUrl + '/api/orders';
  constructor(private http: HttpClient) {}

  checkout(payload: CheckoutRequest): Observable<Order> {
    return this.http.post<Order>(`${this.api}/checkout`, payload);
  }
}
