import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  cartService = inject(CartService);

  currentStep = signal(1);
  orderComplete = signal(false);

  checkoutForm = this.fb.group({
    shipping: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
    }),
    payment: this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiry: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    })
  });

  get shippingForm() { return this.checkoutForm.get('shipping'); }
  get paymentForm() { return this.checkoutForm.get('payment'); }

  nextStep() {
    if (this.currentStep() === 1 && this.shippingForm?.valid) {
      this.currentStep.set(2);
    }
  }

  prevStep() {
    if (this.currentStep() === 2) {
      this.currentStep.set(1);
    }
  }

  placeOrder() {
    if (this.checkoutForm.valid) {
      // Simulate API call
      setTimeout(() => {
        this.cartService.clearCart();
        this.orderComplete.set(true);
        this.currentStep.set(3);
      }, 1000);
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }

  continueShopping() {
    this.router.navigate(['/products']);
  }
}
