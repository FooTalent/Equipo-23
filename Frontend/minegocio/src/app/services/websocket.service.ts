import { Injectable } from "@angular/core";
import { WebSocketSubject } from "rxjs/webSocket";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class WebsocketService {
	private socket$!: WebSocketSubject<any>;
	private messagesSubject = new BehaviorSubject<string>("");
	public messages$ = this.messagesSubject.asObservable();

	constructor() {
		this.connect();
	}

	connect() {
		this.socket$ = new WebSocketSubject("ws://localhost:3000"); // Cambia esto con la URL de tu servidor WebSocket

		this.socket$.subscribe(
			(message) => this.messagesSubject.next(message.content),
			(err) => console.error("Error: ", err),
			() => console.warn("Completed!")
		);
	}

	sendMessage(message: string) {
		this.socket$.next({ content: message });
	}
}
