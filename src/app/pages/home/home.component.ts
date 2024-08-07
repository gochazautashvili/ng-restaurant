import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Category, Product } from '../../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private productService = inject(ProductsService);
  public categories: Category[] = [];
  public products: Product[] = [];

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

    this.productService.addBasket(data).subscribe((res) => {});
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
