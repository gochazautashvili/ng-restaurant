import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Category, Product, TCrat } from '../../types';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private productService = inject(ProductsService);
  private cartService = inject(CartService);
  public categories: Category[] = [];
  public products: Product[] = [];
  public cart: TCrat[] = [];

  public vegeterian?: boolean;
  public nuts?: boolean;
  public spiciness: number = 0;
  public selectedCategoryId!: number | undefined;

  handleAddToBasket(price: number, productId: number) {
    const data = {
      quantity: 1,
      price,
      productId,
    };

    const alreadyInCart = this.cart.some(
      (item) => item.product.id === productId
    );

    if (alreadyInCart) {
      alert('This product is already in cart');
      return;
    }

    this.productService.addBasket(data).subscribe((res) => {
      this.getCart();
    });
  }

  checkInCart(id: number) {
    return this.cart.some((item) => item.product.id === id);
  }

  handleSelectCategory(id: number | undefined) {
    this.selectedCategoryId = id;

    this.getProducts();
  }

  handleResetFilter() {
    this.vegeterian = undefined;
    this.nuts = undefined;
    this.spiciness = 0;

    this.getProducts();
  }

  handleFilterProducts() {
    this.getProducts();
  }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
    this.getCart();
  }

  getCart() {
    this.cartService.getCart().subscribe((res) => {
      this.cart = res;
    });
  }

  getCategories() {
    this.productService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  getProducts() {
    this.productService
      .getProducts(
        this.vegeterian,
        this.nuts,
        this.spiciness,
        this.selectedCategoryId
      )
      .subscribe((res) => {
        this.products = res;
      });
  }
}
