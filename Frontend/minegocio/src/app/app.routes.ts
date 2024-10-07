import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InventoryComponent } from "./components/inventory/inventory.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
	{ path: "", redirectTo: "/login", pathMatch: "full" },
	{ path: "login", component: LoginComponent },
	{ path: "inventory", component: InventoryComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
