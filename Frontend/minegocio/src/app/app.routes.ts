import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateInstanceComponent } from "./components/create-instance/create-instance.component";

export const routes: Routes = [
	{ path: "", redirectTo: "/create-instance", pathMatch: "full" }, // Redirige a create-instance por defecto
	{ path: "create-instance", component: CreateInstanceComponent } // Ruta para el componente
	// Aquí puedes agregar más rutas en el futuro
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
