import { Component, computed, inject, input, OnInit } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { ProductInfo } from './product-info/product-info';
import { ViewReviews } from './view-reviews/view-reviews';

@Component({
  selector: 'app-view-product-detail',
  imports: [BackButton, ProductInfo, ViewReviews],
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-6 xl:px-0">
      <app-back-button class="mb-6" [navigateTo]="backRoute()">Continue Shopping</app-back-button>

      @if (store.selectedProduct(); as product) {
        <div class="flex flex-col md:flex-row items-center gap-8 mb-8 ">
          <img
            [src]="product.imageUrl"
            class="w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] object-cover rounded-lg"
            [style.view-transition-name]="'product-image-' + product.id"
          />

          <div class="flex-1">
            <app-product-info [product]="product" />
          </div>
        </div>

        <app-view-reviews [product]="product" />
      }
    </div>
  `,
  styles: ``,
})
export default class ViewProductDetail implements OnInit {
  productId = input.required<string>();
  store = inject(EcommerceStore);

  constructor() {
    this.store.setProductId(this.productId);
  }

  backRoute = computed(() => `/products/${this.store.category()}`);

  ngOnInit() {
    window.scrollTo(0, 0);
    window.scrollY;
  }
}
