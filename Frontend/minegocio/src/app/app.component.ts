import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms"; // Si usas formularios
import { provideHttpClient } from "@angular/common/http"; // Si haces peticiones HTTP
import { CommonModule } from "@angular/common"; // Para usar directivas como *ngFor y *ngIf

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, FormsModule, CommonModule],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css"
})
export class AppComponent {
	title = "minegocio";
}
