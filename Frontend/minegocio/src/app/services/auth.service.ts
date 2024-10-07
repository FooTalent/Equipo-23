import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private apiUrl = "https://equipo-23-develop-backend.onrender.com/api/sessions/login"; // Ajusta la URL a la correcta

	constructor(private http: HttpClient) {}

	login(email: string, password: string): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}`, { email, password }).pipe(
			tap((response) => {
				if (response && response.token) {
					localStorage.setItem("isLoggedIn", "true");
					localStorage.setItem("token", response.token); // Guardamos el token
					localStorage.setItem("vendorId", response.vendorId); // Guardamos el vendorId del backend
				}
			})
		);
	}

	logout() {
		localStorage.removeItem("isLoggedIn");
		localStorage.removeItem("token");
		localStorage.removeItem("vendorId");
	}

	getToken(): string | null {
		return localStorage.getItem("token");
	}

	getVendorId(): string | null {
		return localStorage.getItem("vendorId");
	}

	isLoggedIn(): boolean {
		return localStorage.getItem("isLoggedIn") === "true";
	}
}
