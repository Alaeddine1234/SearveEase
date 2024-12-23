import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.scss'
})
export class FactureComponent implements OnInit {
  order: any;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadOrderDetails();
  }

  loadOrderDetails(): void {
    // Extract the order ID from the route parameters
    const orderId = this.route.snapshot.paramMap.get('id');

    if (orderId) {
      // Use the service function to get the order by ID
      this.orderService.getOrderById(orderId).subscribe(
        (data) => {
          this.order = data;
          console.log('Order details:', this.order);
        },
        (error) => {
          console.error('Error fetching order details:', error);
        }
      );
    }
  }
  printInvoice(): void {
    window.print();
  }


}
