import { Component, Input, Output, EventEmitter, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStock: boolean;
  sortBy: string;
}

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss'
})
export class FilterPanelComponent {
  @Input() categories: string[] = [];
  @Output() filterChange = new EventEmitter<FilterState>();

  selectedCategory = model<string>('');
  priceRange = model<number>(1000);
  selectedRating = model<number>(0);
  inStockOnly = model<boolean>(false);
  sortBy = model<string>('featured');

  categoriesExpanded = true;
  priceExpanded = true;
  ratingExpanded = true;

  applyFilters() {
    this.filterChange.emit({
      category: this.selectedCategory(),
      minPrice: 0,
      maxPrice: this.priceRange(),
      minRating: this.selectedRating(),
      inStock: this.inStockOnly(),
      sortBy: this.sortBy()
    });
  }

  resetFilters() {
    this.selectedCategory.set('');
    this.priceRange.set(1000);
    this.selectedRating.set(0);
    this.inStockOnly.set(false);
    this.sortBy.set('featured');
    this.applyFilters();
  }
}
