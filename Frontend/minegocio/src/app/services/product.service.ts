import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from './baseApi.service';

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
export class ProductService extends BaseApiService {
  private apiUrl =
    'https://equipo-23-develop-backend.onrender.com/api/products';

  constructor(private http: HttpClient) {
    super()
  }

  getProducts(
    pageNumber: number,
    limit: number,
    query: string
  ): Observable<Product[]> {
    console.log(this.getHeaders())
    return this.http.get<any>(this.apiUrl, {
      withCredentials: true,
      headers: this.getHeaders(),
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
        headers: this.getHeaders(),
      }
    );
  }

  createProduct(productInfo: any): Observable<any> {
    const productStatus = productInfo.status === 'Si' ? 'sale' : 'inventario' 
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
        headers: this.getFileHeaders()
    });
  }

  getProduct(productId: string) {
    return this.http.get(`${this.apiUrl}/${productId}`,{
      withCredentials: true,
      headers: this.getFileHeaders()
    })
  }

  updateProduct(productId: string,productData: any) {
    return this.http.put(`${this.apiUrl}/${productId}`, {
      title: productData.title,
      description: productData.description,
      price: productData.price ?? undefined,
      stock: productData.stock ?? undefined,
    }, {
      withCredentials: true,
      headers: this.getFileHeaders()
    })
  }

  updateProductImages(productId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}/images`, formData, {
      withCredentials: true,
      headers: this.getHeaders(),
    });
  }

  deleteConfirmation = signal(false);

  toggleDeleteConfirmation() {
    this.deleteConfirmation.update((value) => !value);
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${this.apiUrl}/${productId}`, {
      withCredentials: true,
      headers: this.getHeaders(),
    });
  }

  openEditImagesForm = signal(false);

  toggleEditImagesForm() {
    this.openEditImagesForm.update(value => !value);
  }

}
