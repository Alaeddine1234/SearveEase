import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  selectedPaymentMethod: string = 'carte';  // Default value for demo
  orderID: any;
  token: any;
  userData: any;
  username: any;

  isLoading = false; // Loading state
  showSuccessMessage: any;
  showFailureMessage: boolean = false;



  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router // Assuming you get the token from this service
  ) { }

  ngOnInit(): void {
    this.orderID = this.route.snapshot.paramMap.get('id')!;

    const token = this.authService.getToken();
    if (token) {
      const decodedPayload = atob(token.split('.')[1]);
      this.userData = JSON.parse(decodedPayload);
      this.username = this.userData.user.username;
    }

    this.isLoading = false;
    this.showSuccessMessage = false;
    this.showFailureMessage = false;
  }

  payWithCreditCard(): void {
    this.isLoading = true; // Start the loading spinner

    // Simulate the spinner turning for 2 seconds
    setTimeout(() => {
      this.paymentService.createPayment(this.orderID, this.selectedPaymentMethod, this.username).subscribe({
        next: (response) => {
          this.isLoading = false; // Stop the loading spinner
          this.showSuccessMessage = true; // Show the success message
          console.log('Payment successful:', response);

          // After showing the success message for 2 more seconds, navigate to /orders
          setTimeout(() => {
            this.showSuccessMessage = false; // Hide success message after 2 seconds
            this.router.navigate(['/client-dashboard']); // Redirect to /orders
          }, 2000);
        },
        error: (err) => {
          this.isLoading = false; // Stop the loading spinner
          this.showFailureMessage = true;
          console.error('Payment failed:', err);
        }
      });
    }, 2000); // Spinner runs for 2 seconds
  }


}
