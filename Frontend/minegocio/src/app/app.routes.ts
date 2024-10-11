import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyShopComponent } from './myshop/myshop.component';

import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

export const routes: Routes = [
    {path: "", component: DashboardComponent},
    {path: "login", component: LoginComponent},
    {path: "verify-code", component: VerifyCodeComponent},
    {path: "sign-up", component: SignUpComponent},
  { path: 'myshop', component: MyShopComponent },


    {path: "**", component: NotFoundPageComponent},
];
