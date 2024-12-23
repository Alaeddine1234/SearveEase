import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { DishService } from '../services/dish.service';
import { AuthService } from '../services/auth.service';

interface Dish {
  name: string;
  description: string;
  price: number;
  quantity?: number; // Optional, for UI purposes
}

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {
  showModal = false;
  categories: ('plats' | 'boissons' | 'sauces')[] = ['plats', 'boissons', 'sauces'];
  selectedCategory: 'plats' | 'boissons' | 'sauces' = 'plats';
  dishes: Dish[] = [];
  username: any;
  userData: any;
  showConfirmModal = false;
  showSuccessModal = false;
  selectedDish: Dish | undefined;

  constructor(
    private router: Router,
    private cartService: CartService,
    private dishService: DishService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const decodedPayload = atob(token.split('.')[1]);
      this.userData = JSON.parse(decodedPayload);
      this.username = this.userData.user.username;
      this.fetchProducts(this.selectedCategory);
    }
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  fetchProducts(category: 'plats' | 'boissons' | 'sauces'): void {
    this.dishService.getProductsByCategory(category).subscribe({
      next: (response: Dish[]) => {
        this.dishes = response.map(dish => ({
          ...dish,
          quantity: 1
        }));
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  selectCategory(category: 'plats' | 'boissons' | 'sauces'): void {
    this.selectedCategory = category;
    this.fetchProducts(category);
  }

  increaseQuantity(dish: Dish): void {
    if (dish.quantity !== undefined) {
      dish.quantity += 1;
    }
  }

  decreaseQuantity(dish: Dish): void {
    if (dish.quantity !== undefined && dish.quantity > 1) {
      dish.quantity -= 1;
    }
  }

  navigateToCart(): void {
    this.router.navigate([`/cart/${this.username}`]);
    this.closeModal();
  }
  navigateToOrders(): void {
    this.router.navigate([`/my-orders/${this.username}`]);
    this.closeModal();
  }

  closeModal(): void {
    this.showModal = false;
  }

  addToCart(): void {
    if (this.selectedDish) {
      if (!this.selectedDish.name || !this.selectedDish.quantity || !this.selectedDish.price) {
        console.error('Dish data is incomplete');
        return;
      }

      this.cartService.addToCart(this.selectedDish.name, this.selectedDish.quantity, this.selectedDish.price, this.username)
        .subscribe(
          response => {
            console.log('Item added to cart:', response);
            this.showConfirmModal = false;
            this.showSuccessModal = true;

            // Hide the success modal after 3 seconds
            setTimeout(() => {
              this.showSuccessModal = false;
            }, 1000);
          },
          error => console.error('Error adding item to cart:', error)
        );
    }
  }

  confirmAddToCart(dish: Dish): void {
    this.selectedDish = dish;
    this.showConfirmModal = true;
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
    // Clear selectedDish when the confirmation modal is closed
    this.selectedDish = undefined;
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Navigate to login page after logout
  }
}
