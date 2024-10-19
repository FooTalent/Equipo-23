import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  code: string;
  title: string;
  stock: number;
  thumbnails: string;
  price: number;
  status?: boolean;
  created_data?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl =
    'https://equipo-23-develop-backend.onrender.com/api/products';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('user_token'),
  });

  constructor(private http: HttpClient) {}

  getProducts(
    pageNumber: number,
    limit: number,
    query: string
  ): Observable<Product[]> {
    return this.http.get<any>(this.apiUrl, {
      withCredentials: true,
      headers: this.headers,
      params: {
        page: pageNumber.toString(),
        limit: limit.toString(),
        ...(query ? { query: query } : {}),
      },
    });
  }

  changeStatus(productId: string, status: boolean) {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.put<any>(
      url,
      { status },
      {
        withCredentials: true,
        headers: this.headers,
      }
    );
  }

  createProduct(productInfo: any): Observable<any> {
    const productStatus = productInfo.status === 'Si' ? true : false 
    const formData = new FormData();

    formData.append('title', productInfo.title);
    formData.append('description', productInfo.description);
    formData.append('code', productInfo.code);
    formData.append('price', productInfo.price.toString());
    formData.append('stock', productInfo.stock.toString());
    formData.append('status', productStatus.toString());
    formData.append('category', productInfo.category);

    if (productInfo.thumbnails instanceof File) {
        formData.append('thumbnails', productInfo.thumbnails, productInfo.thumbnails.name);
    }

    return this.http.post<any>(this.apiUrl, formData, {
        withCredentials: true,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('user_token'),
        },
    });
}
}
