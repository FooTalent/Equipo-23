import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: "./login.component.html"
})
export class LoginComponent {
	email: string = "";
	password: string = "";

	constructor(private authService: AuthService, private router: Router) {}

	login() {
		this.authService.login(this.email, this.password).subscribe(
			() => {
				this.router.navigate(["/inventory"]); // Redirige al inventario tras login exitoso
			},
			(error) => {
				alert("Credenciales incorrectas. Intenta de nuevo.");
			}
		);
	}
}
