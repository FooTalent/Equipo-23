import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyShopComponent } from './myshop/myshop.component';
import { DesktopPanelComponent} from "./components/desktop-panel/desktop-panel.component";

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, title: 'Mi Negocio' },
    { path: 'myshop', component: MyShopComponent },
    { path: 'desktop-panel', component: DesktopPanelComponent, title: 'Mi Negocio' },
];
