import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { Subject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class WebSocketService {
	private socket$: WebSocketSubject<any>;
	private chats = new Subject<any>(); // Emite nuevos chats con mensajes

	constructor() {
		// Conectar al WebSocket en la URL que estés usando
		this.socket$ = webSocket("wss://tu-url-de-websocket");

		// Escuchar los mensajes entrantes
		this.socket$.subscribe((message) => {
			const chatId = message.chatId; // Suponiendo que cada mensaje tiene un 'chatId'

			// Emitir un evento de nuevo chat o mensaje recibido
			this.chats.next({ chatId, message });
		});
	}

	// Observable para obtener los chats activos
	getChats() {
		return this.chats.asObservable();
	}

	// Método para enviar un mensaje
	sendMessage(chatId: string, content: string) {
		this.socket$.next({ chatId, content });
	}

	// Cerrar la conexión WebSocket
	closeConnection() {
		this.socket$.complete();
	}
}
