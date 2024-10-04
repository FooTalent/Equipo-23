import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WebSocketService } from "../../services/websocket.service";

@Component({
	selector: "app-chat-detail",
	templateUrl: "./chat-detail.component.html",
	styleUrls: ["./chat-detail.component.css"]
})
export class ChatDetailComponent implements OnInit {
	chatId: string | null = null; // Ahora puede ser null hasta que se asigne
	messages: any[] = [];

	constructor(private route: ActivatedRoute, private webSocketService: WebSocketService) {}

	ngOnInit(): void {
		// Obtener el ID del chat desde la ruta
		this.chatId = this.route.snapshot.paramMap.get("chatId");

		if (this.chatId) {
			// Aquí puedes filtrar los mensajes del chat actual basado en chatId
			this.webSocketService.getChats().subscribe((chatData) => {
				if (chatData.chatId === this.chatId) {
					this.messages.push(chatData.message);
				}
			});
		}
	}

	// Función para enviar un mensaje
	sendMessage(content: string) {
		if (this.chatId) {
			this.webSocketService.sendMessage(this.chatId, content);
		}
	}
}
