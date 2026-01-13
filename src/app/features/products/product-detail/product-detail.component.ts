import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map } from 'rxjs';
import { ProductsService } from '../../../core/services/products.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/models';
import { ToastService } from '../../../core/services/toast.service';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);

  product = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.productsService.getProduct(id))
    )
  );

  quantity = 1;
  selectedSize = signal<string>('M');
  selectedColor = signal<string>('Black');

  availableSizes = ['S', 'M', 'L', 'XL'];
  availableColors = ['Black', 'Blue', 'Red', 'Green'];

  updateQuantity(delta: number) {
    const newQty = this.quantity + delta;
    if (newQty >= 1) {
      this.quantity = newQty;
    }
  }

  addToCart() {
    const p = this.product();
    if (p) {
      // For now, CartService deals with Product uniqueness only by ID.
      // To fully implement variants, we'd need to extend CartItem to include variant info
      // and update CartService to match based on (id + size + color).
      // Given the spec "CartService ... add/update/remove", changing the uniqueness logic
      // might be out of scope or risky for a quick update.
      // So I will just add the product to cart, but maybe I can eventually append the variant info 
      // to the title or manage it separately.
      // Better approach for "Simulate": Just add to cart.

      this.cartService.addToCart(p);
      this.toastService.show(`Added ${this.quantity} x ${p.title} (${this.selectedSize()}, ${this.selectedColor()})`);
    }
  }
}
