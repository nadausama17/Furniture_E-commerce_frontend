import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductCartService } from 'src/app/Service/productCart.service';
import { CartService } from './../../Service/cart.service';
import { Product } from './../../Model/product.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  cartList: any[] = [];
  addedProducts: any = [];
  cartCounter: any = 0;
  totalAmount: any = 0;
  @Output() updateItems = new EventEmitter<any>();
  value20: number = 1;
  cartitem!: Product;
  counterValue: number = 0;
  imagUrlProduct: string = 'http://127.0.0.1:8000/uploads/product/';
  constructor(
    private productCartService: ProductCartService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    // this.cartList = this.productCartService.getProducts();
    this.cartService.getApiCart();
    this.cartService.cartHasBeenChanged.subscribe({
      next: (res) => {
        console.log(res);
        this.addedProducts = res;
        let counter = 0,
          amount = 0,
          lastprice = 0,
          total = 0;
        this.addedProducts.forEach((element: any) => {
          counter += element.count;
          if (element.discount || element.count++) {
            lastprice = element.price - element.discount;
            amount = lastprice * element.count;
            total += amount;
          } else {
            amount = element.price * element.count;
            total += amount;
          }
        });
        this.cartCounter = counter;
        this.totalAmount = total;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
  removeCartItem(item: any) {
    this.productCartService.removeProduct(item);
    // this.cartList = this.productCartService.getProducts();
    this.updateItems.emit();
  }
  changeItemSitus(product: Product, count: any) {
    product.status = count;
    console.log(count);

    this.productCartService.onStaitusChang(product);
    this.updateItems.emit();
  }
  increment() {
    this.counterValue++;
  }
  decrement() {
    this.counterValue--;
  }
}
