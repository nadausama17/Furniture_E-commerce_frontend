import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../Model/product.model';

import { AppComponent } from './../app.component';

@Injectable({ providedIn: 'root' })
export class ProductCartService {
  // Make _ProductsSource private so it's not accessible from the outside,
  // expose it as Products$ observable (read-only) instead.
  // Write to _ProductsSource only through specified store methods below.
  private readonly _ProductsSource = new BehaviorSubject<Product[]>([]);

  // Exposed observable (read-only).
  readonly Products$ = this._ProductsSource.asObservable();

  constructor() {}

  // Get last value without subscribing to the Products$ observable (synchronously).
  getProducts(): Product[] {
    return this._ProductsSource.getValue();
  }

  private _setProducts(products: Product[]): void {
    this._ProductsSource.next(products);
  }

  addProduct(product: Product): void {
    const products = [...this.getProducts(), product];
    if (this.getProducts().includes(product)) {
      product.status = product.status + 1;
    } else {
      // this.cartHasBeenChanged.next(this.cartDetalis);
      this._setProducts(products);
    }
  }
  onStaitusChang(product: any) {
    if (this.getProducts().includes(product)) {
      this._ProductsSource.next({ ...this._ProductsSource.value, ...product });
    }
  }

  removeProduct(product: Product): void {
    const Products = this.getProducts().filter((p) => p.id !== product.id);
    this._setProducts(Products);
  }

  adoptProduct(product: Product): void {
    const newProducts = this.getProducts().map((p) =>
      p.id === product.id ? ({} as Product) : p
    );
    this._setProducts(newProducts);
  }
  getTotalAmount() {
    return this.getProducts().length;
  }
  totalPrice() {
    let totalPrice = 0;
    let productList = this.getProducts();
    productList.forEach((element: Product) => {
      totalPrice += element.status * element.selling_price;
    });
    // this.cartHasBeenChanged.next(this.cartDetalis);
    return totalPrice;
  }
}