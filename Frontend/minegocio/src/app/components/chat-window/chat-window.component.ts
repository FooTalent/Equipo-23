import { Component } from "@angular/core";
import { WebsocketService } from "../../services/websocket.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-chat-window",
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: "./chat-window.component.html",
	styleUrl: "./chat-window.component.css"
})
export class ChatWindowComponent {
	messages: string[] = [];
	message: string = "";

	constructor(private websocketService: WebsocketService) {
		this.websocketService.messages$.subscribe((msg) => {
			this.messages.push(msg);
		});
	}

	sendMessage() {
		this.websocketService.sendMessage(this.message);
		this.message = "";
	}
}
