import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog"; // Importa MatDialogModule
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { AppComponent } from "./app.component";
import { CreateInstanceComponent } from "./components/create-instance/create-instance.component";
import { UserModalComponent } from "./components/user-modal/user-modal.component";
import { AppRoutingModule } from "./app.routes"; // Importa AppRoutingModule

@NgModule({
	declarations: [CreateInstanceComponent],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		MatDialogModule, // Asegúrate de agregar esto aquí
		MatFormFieldModule,
		MatInputModule,
		AppRoutingModule
	],
	providers: [provideHttpClient()],
	bootstrap: []
})
export class AppModule {}
