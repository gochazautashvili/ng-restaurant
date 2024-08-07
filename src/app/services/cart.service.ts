import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TCrat, TData } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private API_URL = 'https://restaurant.stepprojects.ge/api';
  private API = inject(HttpClient);

  getCart() {
    return this.API.get<TCrat[]>(`${this.API_URL}/Baskets/GetAll`);
  }

  deleteProduct(id: number) {
    return this.API.delete<TCrat[]>(
      `${this.API_URL}/Baskets/DeleteProduct/${id}`
    );
  }

  increment(data: TData) {
    return this.API.put(`${this.API_URL}/Baskets/UpdateBasket`, data);
  }

  decrement(data: TData) {
    return this.API.put(`${this.API_URL}/Baskets/UpdateBasket`, data);
  }
}
