import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserModalComponent } from "../user-modal/user-modal.component";

@Component({
	selector: "app-create-instance",

	templateUrl: "./create-instance.component.html",
	styleUrl: "./create-instance.component.css"
})
export class CreateInstanceComponent {
	constructor(public dialog: MatDialog) {}

	openDialog(): void {
		const dialogRef = this.dialog.open(UserModalComponent, {
			width: "300px" // Ancho del modal
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log("El modal se cerró"); // Puedes manejar algo después de que se cierre
		});
	}
}
