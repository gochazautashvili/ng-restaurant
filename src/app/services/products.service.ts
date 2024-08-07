import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category, Product, TData } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = 'https://restaurant.stepprojects.ge/api';
  private API = inject(HttpClient);

  getCategories() {
    return this.API.get<Category[]>(`${this.API_URL}/Categories/GetAll`);
  }

  getProducts(
    vegeterian?: boolean,
    nuts?: boolean,
    spiciness?: number,
    categoryId?: number
  ) {
    return this.API.get<Product[]>(
      `${this.API_URL}/Products/GetFiltered?vegeterian=${
        vegeterian || ''
      }&nuts=${nuts || ''}&spiciness=${spiciness || ''}&categoryId=${
        categoryId || ''
      }`
    );
  }

  addBasket(data: TData) {
    return this.API.post(
      'https://restaurant.stepprojects.ge/api/Baskets/AddToBasket',
      data
    );
  }
}
