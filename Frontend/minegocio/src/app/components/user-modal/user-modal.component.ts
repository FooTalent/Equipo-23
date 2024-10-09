import { NgModule } from "@angular/core";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import QRCode from "qrcode";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms"; // Importar FormsModule
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-user-modal",
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, FormsModule, CommonModule],
	templateUrl: "./user-modal.component.html",
	styleUrl: "./user-modal.component.css"
})
export class UserModalComponent {
	instanceName: string = ""; // Variable para almacenar el nombre del usuario
	qrCode: string | undefined; // Variable para almacenar el código QR

	constructor(public dialogRef: MatDialogRef<UserModalComponent>, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any) {}

	createInstance() {
		// Verificamos que el nombre de la instancia no esté vacío
		if (!this.instanceName) {
			alert("Por favor, ingresa un nombre de usuario.");
			return;
		}

		// Llamamos a la API del backend para crear la instancia
		this.http.post(`https://equipo-23-develop-backend.onrender.com/api/evolution/instance/create/${this.instanceName}`, {}).subscribe(
			(response: any) => {
				// Asumimos que el backend devuelve un objeto con el QR
				this.qrCode = response.qrcode; // Guardamos el QR que devuelve el backend
			},
			(error) => {
				console.error("Error al crear la instancia:", error);
				alert("Ocurrió un error al crear la instancia.");
			}
		);
	}

	onNoClick(): void {
		this.dialogRef.close(); // Cerrar el modal
	}
}
