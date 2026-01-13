import { Injectable, computed, signal, effect, inject } from '@angular/core';
import { Product, CartItem } from '../models/models';
import { ToastService } from './toast.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private toast = inject(ToastService);
    private cartItems = signal<CartItem[]>(this.loadCart());

    cartCount = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
    cartTotal = computed(() => this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0));

    items = this.cartItems.asReadonly();

    constructor() {
        effect(() => {
            localStorage.setItem('cart', JSON.stringify(this.cartItems()));
        });
    }

    private loadCart(): CartItem[] {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    }

    addToCart(product: Product) {
        this.cartItems.update(items => {
            const existing = items.find(i => i.product.id === product.id);
            if (existing) {
                return items.map(i => i.product.id === product.id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i);
            }
            return [...items, { product, quantity: 1 }];
        });
        this.toast.show('Added to cart');
    }

    removeFromCart(productId: number) {
        this.cartItems.update(items => items.filter(i => i.product.id !== productId));
    }

    updateQuantity(productId: number, quantity: number) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        this.cartItems.update(items =>
            items.map(i => i.product.id === productId ? { ...i, quantity } : i)
        );
    }

    clearCart() {
        this.cartItems.set([]);
    }
}
