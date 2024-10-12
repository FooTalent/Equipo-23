import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getProducts(
    pageNumber: number,
    limit: number,
    query: string
  ): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('user_token'),
    });

    return this.http.get<any>(this.apiUrl, {
      withCredentials: true,
      headers: headers,
      params: {
        page: pageNumber.toString(),
        limit: limit.toString(),
        query: query,
      },
    });
  }
}
