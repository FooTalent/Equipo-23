import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QrCodeComponent } from "./components/qr-code/qr-code.component";
import { ChatComponent } from "./components/chat-window/chat-window.component";

export const routes: Routes = [
	{ path: "qr-code", component: QrCodeComponent },
	{ path: "chat/:instanceName/:remoteJid", component: ChatComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
