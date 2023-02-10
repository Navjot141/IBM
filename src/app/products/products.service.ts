import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Product } from './store/product';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>("http://random-data-api.com/api/coffee/random_coffee?size=50");
  }

  createProduct(payload: Product) {
    return this.http.post<Product>("http://random-data-api.com/api/coffee/random_coffee", payload);
  }
}
