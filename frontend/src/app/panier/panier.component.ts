import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  cartItems: any[] = [];
  tableIndex: number | null = null;
  username: any;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      if (this.username) {
        this.fetchCartItems(this.username);
      }
    });
  }

  fetchCartItems(username: string): void {
    this.cartService.getCartItems(username).subscribe({
      next: (response: any[]) => {
        this.cartItems = response;
        console.log("cart items: ", this.cartItems);
      },
      error: (error: any) => {
        console.error('Error fetching cart items:', error);
      }
    });
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
  }


  removeItem(dish: string): void {
    this.cartService.removeFromCart(this.username, dish).subscribe({
      next: (response) => {
        console.log('Item removed:', response);
        this.cartItems = this.cartItems.filter(item => item.product !== dish); // Update UI
      },
      error: (error) => {
        console.error('Error removing item:', error);
      }
    });
  }


  createOrder(): void {
    if (this.username && this.tableIndex && this.cartItems.length > 0) {
      const orderDetails = this.cartItems.map(item => ({
        productName: item.product,
        productID: item._id,
        quantity: item.quantity
      }));

      const totalPrice = this.calculateTotal();

      const order = {
        username: this.username,
        tableNumber: this.tableIndex,
        orderDetails: orderDetails,
        totalPrice: totalPrice
      };

      this.orderService.createOrder(order).subscribe(
        response => {
          console.log('Order created successfully:', response);
          this.cartItems = [];
          this.cartService.clearCart(this.username).subscribe(
            () => {
              console.log('Cart cleared successfully');
            },
            (            error: any) => {
              console.error('Error clearing cart:', error);
            }
          );
          this.router.navigate(['/client-dashboard']);
        },
        error => {
          console.error('Error creating order:', error);
        }
      );
    } else {
      console.error('Missing required information or cart is empty');
    }
  }

  clearCart(): void {
    this.cartService.clearCart(this.username).subscribe({
      next: (response) => {
        console.log('Cart cleared:', response);
        this.cartItems = []; // Clear the cart in the UI
      },
      error: (error) => {
        console.error('Error clearing cart:', error);
      }
    });
  }
}
