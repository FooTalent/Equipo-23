import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QrCodeComponent } from "./components/qr-code/qr-code.component";
import { ChatWindowComponent } from "./components/chat-window/chat-window.component";

export const routes: Routes = [
	{ path: "whatsapp-qr", component: QrCodeComponent },
	{ path: "whatsapp-chat", component: ChatWindowComponent },
	{ path: "", redirectTo: "/whatsapp-qr", pathMatch: "full" }, // Redirige al QR por defecto
	{ path: "**", redirectTo: "/whatsapp-qr" } // Redirige a la página QR si no existe la ruta
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
