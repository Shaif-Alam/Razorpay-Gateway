import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8000/order';

  constructor(private http: HttpClient) {}

  createOrder(amount: number, currency: string) {
    return this.http.post<any>(this.apiUrl, { amount, currency });
  }
}
