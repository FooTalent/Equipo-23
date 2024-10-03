import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class MessageService {
	private apiUrl = "http://localhost:3000/api/messages"; // Cambia la URL según la ubicación de tu backend

	constructor(private http: HttpClient) {}

	sendMessage(messageData: any): Observable<any> {
		return this.http.post(this.apiUrl, messageData);
	}
}
