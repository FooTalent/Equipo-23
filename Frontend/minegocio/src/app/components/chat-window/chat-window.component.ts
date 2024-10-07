import { Component, OnInit } from "@angular/core";
import axios from "axios";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-chat-window",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./chat-window.component.html",
	styleUrl: "./chat-window.component.css"
})
export class ChatComponent implements OnInit {
	messages: any[] = [];
	instanceName: string = ""; // Inicializa con una cadena vacía
	remoteJid: string = ""; // Inicializa con una cadena vacía

	// Inyectar ActivatedRoute en el constructor
	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		// Obtener los parámetros de la ruta
		this.route.params.subscribe((params) => {
			this.instanceName = params["instanceName"];
			this.remoteJid = params["remoteJid"];
			this.loadMessages(); // Llamar a loadMessages después de obtener los parámetros
		});
	}

	async loadMessages() {
		try {
			const response = await axios.post(`URL_DEL_SERVICIO_DE_MENSAJES/${this.instanceName}/${this.remoteJid}`);
			this.messages = response.data; // Asegúrate de que la estructura de la respuesta sea correcta
		} catch (error) {
			console.error("Error al cargar los mensajes", error);
		}
	}
}
