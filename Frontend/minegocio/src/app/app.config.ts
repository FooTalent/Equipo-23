import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { NgModule } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withFetch } from "@angular/common/http";

import { QRCodeModule } from "angularx-qrcode";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

NgModule({
	declarations: [],
	imports: [QRCodeModule],
	providers: []
});

export const appConfig: ApplicationConfig = {
	providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch()), provideAnimationsAsync()]
};

export class AppModule {}
