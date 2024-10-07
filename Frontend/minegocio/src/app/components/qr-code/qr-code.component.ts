import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import axios from "axios";

@Component({
	selector: "app-qr-code",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./qr-code.component.html",
	styleUrl: "./qr-code.component.css"
})
export class QrCodeComponent implements OnInit {
	qrCodeUrl: string | null = null;

	ngOnInit(): void {
		this.getQrCode();
	}

	async getQrCode() {
		try {
			const response = await axios.get("https://equipo-23-develop-backend.onrender.com/instance/create"); // Cambia esto a tu endpoint para obtener el QR
			this.qrCodeUrl = response.data.url; // Asegúrate de que la estructura de la respuesta sea correcta
		} catch (error) {
			console.error("Error al obtener el código QR", error);
		}
	}
}
