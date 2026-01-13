import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductsService } from '../../../core/services/products.service';
import { CartService } from '../../../core/services/cart.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { FilterPanelComponent, FilterState } from '../filter-panel/filter-panel.component';
import { Product } from '../../../core/models/models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, FilterPanelComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private productsService = inject(ProductsService);
  cartService = inject(CartService);

  allProducts = toSignal(
    this.productsService.getProducts().pipe(
      map(products => products.map(p => ({
        ...p,
        stock: p.stock ?? Math.floor(Math.random() * 20)
      })))
    ),
    { initialValue: [] }
  );
  categories = toSignal(this.productsService.getCategories(), { initialValue: [] });

  searchQuery = signal('');
  filters = signal<FilterState>({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    inStock: false,
    sortBy: 'featured'
  });

  filteredProducts = computed(() => {
    let products = this.allProducts();
    const query = this.searchQuery().toLowerCase();
    const filter = this.filters();

    // 1. Filtering
    products = products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query);
      const matchesCategory = !filter.category || p.category === filter.category;
      const matchesPrice = p.price >= filter.minPrice && p.price <= filter.maxPrice;
      const matchesRating = p.rating.rate >= filter.minRating;
      const matchesStock = !filter.inStock || (p.stock !== undefined && p.stock > 0);

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
    });

    // 2. Sorting
    switch (filter.sortBy) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return products.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return products;
    }
  });

  onFilterChange(newFilters: FilterState) {
    this.filters.set(newFilters);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
