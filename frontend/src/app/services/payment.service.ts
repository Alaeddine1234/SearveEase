import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:3000/api/payment'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  createPayment(orderID: string, paymentMethod: string, username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = { orderID, paymentMethod, username };

    return this.http.post(`${this.apiUrl}`, body, { headers });
  }}
