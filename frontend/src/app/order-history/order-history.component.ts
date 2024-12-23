import { Component } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {
  orders = [
    { id: '001', username: 'john_doe', details: 'Burger, Fries', date: '2024-08-29', table: 12 },
    { id: '002', username: 'jane_smith', details: 'Pizza, Salad', date: '2024-08-28', table: 5 },
    { id: '003', username: 'jane_smith', details: 'Pizza, Salad', date: '2024-08-28', table: 5 },
    { id: '002', username: 'jane_smith', details: 'Pizza, Salad', date: '2024-08-28', table: 5 },
    { id: '002', username: 'jane_smith', details: 'Pizza, Salad', date: '2024-08-28', table: 5 },
    { id: '002', username: 'jane_smith', details: 'Pizza, Salad', date: '2024-08-28', table: 5 },
    { id: '002', username: 'jane_smith', details: 'Pizza, Salad', date: '2024-08-28', table: 5 },
    { id: '002', username: 'jane_smith', details: 'Pizza, Salad', date: '2024-08-28', table: 5 },
    { id: '002', username: 'jane_smith', details: 'Pizza, Salad', date: '2024-08-28', table: 5 },
    { id: '002', username: 'jane_smith', details: 'Pizza, Salad', date: '2024-08-28', table: 5 },
    { id: '002', username: 'jane_smith', details: 'Pizza, Salad', date: '2024-08-28', table: 5 },
    { id: '002', username: 'jane_smith', details: 'Pizza, Salad', date: '2024-08-28', table: 5 },
    { id: '002', username: 'jane_smith', details: 'Pizza, Salad', date: '2024-08-28', table: 5 },
    { id: '002', username: 'jane_smith', details: 'Pizza, Salad', date: '2024-08-28', table: 5 },
    { id: '002', username: 'jane_smith', details: 'Pizza, Salad', date: '2024-08-28', table: 5 },
    // Add more orders here
  ];
}
