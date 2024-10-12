import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyShopComponent } from './myshop/myshop.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { authGuard } from './guards/auth.guard';
import { nonAuthGuard } from './guards/non-auth.guard';

export const routes: Routes = [
    {path: "", component: DashboardComponent, canActivate: [authGuard]},
    {path: "login", component: LoginComponent, canActivate: [nonAuthGuard]},
    {path: "verify-code", component: VerifyCodeComponent, canActivate: [nonAuthGuard]},
    {path: "sign-up", component: SignUpComponent, canActivate: [nonAuthGuard]},
    {path: 'myshop', component: MyShopComponent, canActivate: [authGuard]},
    {path: "**", component: NotFoundPageComponent},
];
