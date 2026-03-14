import { QtySelector } from './../../components/qty-selector/qty-selector';
import { Component, computed, inject, input } from '@angular/core';
import { CartItem } from '../../models/cart';
import { EcommerceStore } from '../../ecommerce-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-show-cart-item',
  imports: [QtySelector, MatButtonModule, MatIcon],
  template: `
    <div class="grid grid-cols-2 gap-4 md:gap-0 md:grid-cols-[3fr_1fr_1fr]">
      <div class="flex flex-col sm:flex-row items-center gap-4 col-span-2 md:col-span-1">
        <img
          [src]="item().product.imageUrl"
          class="w-30 h-30 md:w-24 md:h-24 rounded-lg object-cover"
          [style.view-transition-name]="'product-image-' + item().product.id"
        />

        <div>
          <div class="text-gray-900 text-lg font-semibold">{{ item().product.name }}</div>
          <div class="text-gray-600 text-lg ">\${{ item().product.price }}</div>
        </div>
      </div>

      <app-qty-selector
        [quantity]="item().quantity"
        (qtyUpdated)="store.setItemQuantity({ productId: item().product.id, quantity: $event })"
      />

      <div class="flex flex-col items-end">
        <div class="text-right font-semibold text-lg">\${{ total() }}</div>
        <div class="flex -me-3">
          <button matIconButton (click)="store.moveToWishlist(item().product)">
            <mat-icon>favorite_border</mat-icon>
          </button>
          <button matIconButton class="danger" (click)="store.removeFromCart(item().product)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ShowCartItem {
  item = input.required<CartItem>();
  store = inject(EcommerceStore);

  total = computed(() => (this.item().product.price * this.item().quantity).toFixed(2));
}
