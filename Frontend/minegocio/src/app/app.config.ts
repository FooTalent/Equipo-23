import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { NgModule } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { QrCodeComponent } from "./components/qr-code/qr-code.component";
import { ChatComponent } from "./components/chat-window/chat-window.component";
import { QRCodeModule } from "angularx-qrcode";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";

NgModule({
	declarations: [QrCodeComponent, ChatComponent],
	imports: [QRCodeModule],
	providers: []
});

export const appConfig: ApplicationConfig = {
	providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch())]
};

export class AppModule {}
