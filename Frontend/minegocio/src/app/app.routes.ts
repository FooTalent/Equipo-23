import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyShopComponent } from './myshop/myshop.component';


export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, title: 'Mi Negocio' },
    { path: 'myshop', component: MyShopComponent },
];
