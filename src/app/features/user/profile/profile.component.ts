import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  authService = inject(AuthService);

  // Mock order history
  orderHistory = signal([
    { id: '#ORD-7782', date: '2023-10-15', total: 125.50, status: 'Delivered' },
    { id: '#ORD-9921', date: '2023-11-02', total: 54.00, status: 'Processing' }
  ]);
}
