import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MessageService } from "../../services/message.service";

@Component({
	selector: "app-message-scheduler",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: "./message-scheduler.component.html",
	styleUrl: "./message-scheduler.component.css"
})
export class MessageSchedulerComponent {
	messageData = {
		name: "",
		phone: "",
		country: "",
		message: "",
		timestamp: ""
	};

	constructor(private messageService: MessageService) {}

	sendMessage() {
		// Capturar la hora y fecha actual
		const now = new Date();
		this.messageData.timestamp = now.toISOString(); // Almacena la fecha y hora en formato ISO

		this.messageService.sendMessage(this.messageData).subscribe(
			(response) => {
				console.log("Message sent successfully", response);
				console.log(this.messageData);
			},
			(error) => {
				console.error("Error to sending", error);
				console.log(this.messageData);
			}
		);
	}
}
