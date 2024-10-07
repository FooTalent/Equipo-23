import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-qr-code",
	standalone: true,
	imports: [],
	templateUrl: "./qr-code.component.html",
	styleUrl: "./qr-code.component.css"
})
export class QrCodeComponent implements OnInit {
	qrCodeData = "ws://localhost:3000"; // Cambia esto con la URL de tu servidor WebSocket

	constructor(private router: Router) {}

	ngOnInit() {
		// Simula un evento después de 5 segundos o puedes agregar lógica para escuchar el escaneo
		setTimeout(() => {
			this.router.navigate(["/whatsapp-chat"]);
		}, 50000); // Redirigir tras 5 segundos
	}
}
