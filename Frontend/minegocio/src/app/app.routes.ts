import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChatListComponent } from "./components/chat-list/chat-list.component";
import { ChatDetailComponent } from "./components/chat-detail/chat-detail.component";

export const routes: Routes = [
	{ path: "chats", component: ChatListComponent },
	{ path: "chat/:chatId", component: ChatDetailComponent }, // Ruta dinámica para el detalle del chat
	{ path: "", redirectTo: "/chats", pathMatch: "full" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
