import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../../core/models/models';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input({ required: true }) item!: CartItem;
  @Output() quantityChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();

  onQuantityChange(delta: number) {
    this.quantityChange.emit(this.item.quantity + delta);
  }
}
