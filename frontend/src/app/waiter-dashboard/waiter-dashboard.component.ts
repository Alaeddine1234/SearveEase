import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-waiter-dashboard',
  templateUrl: './waiter-dashboard.component.html',
  styleUrls: ['./waiter-dashboard.component.scss'] // Corrected styleUrl to styleUrls
})
export class WaiterDashboardComponent implements OnInit {
  orders: any[] = [];
  userData: any;
  role: any;

  constructor(
    private ordersService: OrderService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    const token = this.authService.getToken();
    if (token) {
      const decodedPayload = atob(token.split('.')[1]);
      this.userData = JSON.parse(decodedPayload);
      this.role = this.userData.user.role;
    }
  }

  onStatusChange(orderId: string, newStatus: string): void {
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe(
      updatedOrder => {
        const orderIndex = this.orders.findIndex(order => order._id === orderId);
        if (orderIndex !== -1) {
          this.orders[orderIndex] = updatedOrder;
        }
      },
      error => {
        console.error('Error updating order status', error);
      }
    );
  }

  loadOrders(): void {
    this.ordersService.getOrders().subscribe(
      (orders: any[]) => {
        this.orders = orders.filter(order => order.status !== 'Served').map(order => {
          return {
            ...order,
            date: new Date(order.createdAt) // Formattage de la date
          };
        });
        console.log("Filtered orders (excluding 'Served'): ", this.orders);
      },
      (error) => {
        console.error('Error loading orders:', error);
      }
    );
  }

  navigateToInvoice(id: string): void {
    this.router.navigate([`/facture/${id}`]);
  }
}
