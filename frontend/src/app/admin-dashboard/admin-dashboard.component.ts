import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  providers: [DatePipe]
})
export class AdminDashboardComponent {
  orders: any[] = [];
  role: any;
  totalIncome: number = 0;
  userData: any;


  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private authService: AuthService
  ) {}
  formatDateTime(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'MMMM d, y, h:mm a');
  }

  ngOnInit(): void {
    this.fetchAllOrders();
    const token = this.authService.getToken();
    if (token) {
      const decodedPayload = atob(token.split('.')[1]);
      this.userData = JSON.parse(decodedPayload);
      this.role = this.userData.user.role;
    }
  }

  fetchAllOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders: any[]) => {
        this.orders = orders;
        console.log("orders:", this.orders)
        this.calculateTotalIncome();
      },
      error: (error: any) => {
        console.error('Error fetching orders:', error);
      }
    });
  }

  navigateToInvoice(id: string): void {
    this.router.navigate([`/facture/${id}`]);
  }

  calculateTotalIncome(): void {
    this.totalIncome = this.orders.reduce((sum, order) => sum + order.totalPrice, 0);
  }
}
