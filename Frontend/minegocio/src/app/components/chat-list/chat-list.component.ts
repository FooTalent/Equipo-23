import { Component, OnInit } from "@angular/core";
import { WebSocketService } from "../../services/websocket.service";
import { CommonModule } from "@angular/common"; // Para usar directivas como *ngFor y *ngIf

@Component({
	selector: "app-chat-list",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./chat-list.component.html",
	styleUrls: ["./chat-list.component.css"]
})
export class ChatListComponent implements OnInit {
	chats: any[] = []; // Arreglo para almacenar los chats

	constructor(private webSocketService: WebSocketService) {}

	ngOnInit(): void {
		// Suscribirse para recibir chats y mensajes automáticamente
		this.webSocketService.getChats().subscribe((chatData) => {
			const chatExists = this.chats.some((chat) => chat.chatId === chatData.chatId);

			if (!chatExists) {
				// Si no existe el chat, agregarlo a la lista de chats
				this.chats.push({ chatId: chatData.chatId, messages: [chatData.message] });
			} else {
				// Si ya existe, agregar el mensaje al chat correspondiente
				const chat = this.chats.find((chat) => chat.chatId === chatData.chatId);
				chat.messages.push(chatData.message);
			}
		});
	}

	// Función para abrir un chat específico
	openChat(chatId: string) {
		// Aquí navegas al componente del detalle del chat
	}
}
