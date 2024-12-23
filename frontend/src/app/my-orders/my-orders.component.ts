import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
  providers: [DatePipe] // Add DatePipe as a provider

})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];
  username: string | null = null;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router
  ) {}
  formatDateTime(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'MMMM d, y, h:mm a');
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      if (this.username) {
        this.fetchOrders(this.username);
      }
    });
  }

  fetchOrders(username: string): void {
    this.orderService.getOrdersByUsername(username).subscribe({
      next: (orders: any[]) => {
        this.orders = orders;
        console.log("orders:", this.orders)
      },
      error: (error: any) => {
        console.error('Error fetching orders:', error);
      }
    });
  }

  navigateToInvoice(id: string): void {
    this.router.navigate([`/facture/${id}`]);
  }

  navigateToPayment(id: string): void {
    this.router.navigate([`/payment/${id}`]);
  }
}
