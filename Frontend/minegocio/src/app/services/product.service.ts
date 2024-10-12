import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  code: string;
  title: string;
  stock: number;
  price: number;
  status: string;
  created_data: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl =
    'https://equipo-23-develop-backend.onrender.com/api/products';

  constructor(private http: HttpClient) {}

  getProducts(pageNumber: number, limit: number, query: string): Observable<Product[]> {
    return this.http.get<any>(this.apiUrl, { 
        withCredentials: true,
        params: { 
            page: pageNumber.toString(),
            limit: limit.toString(),
            query: query // Agregar el parámetro de búsqueda
        }
    });
  }

  // Aquí puedes agregar más métodos para otras operaciones CRUD si es necesario
}
