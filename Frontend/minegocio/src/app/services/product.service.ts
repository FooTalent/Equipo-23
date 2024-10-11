import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  status: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://equipo-23-develop-backend.onrender.com/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Aquí puedes agregar más métodos para otras operaciones CRUD si es necesario
}