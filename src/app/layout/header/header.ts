import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Sidebar } from '../../services/sidebar';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    HeaderActions,
    MatButtonModule,
    MatIcon,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
  ],
  template: `
    <mat-toolbar class="w-full elevated py-2 bg-red-200">
      <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between">
        <div class="flex items-center sm:gap-2">
          <button matIconButton (click)="sidebarStore.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="hidden sm:block md:hidden">MS</span>
          <span class="hidden md:block">Modern Store</span>
        </div>

        <mat-form-field appearance="outline" class="max-w-[200px] md:max-w-lg bg-white">
          <input [formControl]="searchControl" matInput placeholder="Search products..." />
          <mat-icon matPrefix>search</mat-icon>
        </mat-form-field>

        <app-header-actions />
      </div>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {
  sidebarStore = inject(Sidebar);

  store = inject(EcommerceStore);

  searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.store.search(value ?? '');
    });
  }
}
