import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../interfaces/product.model";

@Injectable({
	providedIn: "root"
})
export class ProductService {
	private apiUrl = "https://equipo-23-develop-backend.onrender.com/api/products";

	constructor(private http: HttpClient) {}

	getProducts(vendorId: string): Observable<Product[]> {
		return this.http.get<Product[]>(`${this.apiUrl}?vendorId=${vendorId}`);
	}

	addProduct(product: Product): Observable<Product> {
		return this.http.post<Product>(this.apiUrl, product);
	}

	updateProduct(productId: string, product: Product): Observable<Product> {
		return this.http.put<Product>(`${this.apiUrl}/${productId}`, product);
	}

	deleteProduct(productId: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${productId}`);
	}
}
