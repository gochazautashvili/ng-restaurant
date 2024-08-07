import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { TCrat, TData } from '../../types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  public products: TCrat[] = [];
  private cartService = inject(CartService);
  public isDeletingId!: number | undefined;
  public isLoading = false;

  handleDelete(id: number) {
    this.isDeletingId = id;
    this.cartService.deleteProduct(id).subscribe((res) => {
      this.isDeletingId = undefined;
      this.getCart();
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.getCart();
  }

  getCart() {
    this.cartService.getCart().subscribe((res) => {
      this.products = res;
      this.isLoading = false;
    });
  }

  calculateTotalPriceAndReturn() {
    let totalPrice = 0;

    this.products.map((cart) => {
      totalPrice += cart.price * cart.quantity;
    });

    return totalPrice;
  }

  handleCheckout() {
    this.products.forEach((cart) => {
      this.handleDelete(cart.product.id);
    });

    alert('success');
  }

  handleIncrement(cart: TCrat) {
    const data: TData = {
      price: cart.price,
      productId: cart.product.id,
      quantity: cart.quantity + 1,
    };

    console.log(data);

    this.cartService.increment(data).subscribe(() => {
      this.getCart();
    });
  }

  handleDecrement(cart: TCrat) {
    if (cart.quantity < 2) return;

    const data: TData = {
      price: cart.price * (cart.quantity - 1),
      productId: cart.product.id,
      quantity: cart.quantity - 1,
    };

    this.cartService.decrement(data).subscribe(() => {
      this.getCart();
    });
  }
}
