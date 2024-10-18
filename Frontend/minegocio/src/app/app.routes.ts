import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyShopComponent } from './myshop/myshop.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { authGuard } from './guards/auth.guard';
import { nonAuthGuard } from './guards/non-auth.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ChatsComponent } from './chats/chats.component';
import { UnderDevelopmentComponent } from './components/under-development/under-development.component';

export const routes: Routes = [
    {path: "", component: DashboardComponent, canActivate: [authGuard]},
    {path: "login", component: LoginComponent, canActivate: [nonAuthGuard]},
    {path: "verify-code", component: VerifyCodeComponent, canActivate: [nonAuthGuard]},
    {path: "sign-up", component: SignUpComponent, canActivate: [nonAuthGuard]},
    {path: 'myshop', component: MyShopComponent, canActivate: [authGuard]},
    {path: 'user-profile', component: UserProfileComponent, canActivate: [authGuard]},
    {path: 'messages', component: ChatsComponent, canActivate: [authGuard]},
    {path: "notifications", component: UnderDevelopmentComponent, canActivate: [authGuard]},
    {path: "clients", component: UnderDevelopmentComponent, canActivate: [authGuard]},
    {path: "stadistics", component: UnderDevelopmentComponent, canActivate: [authGuard]},
    {path: "billing", component: UnderDevelopmentComponent, canActivate: [authGuard]},
    {path: "settings", component: UnderDevelopmentComponent, canActivate: [authGuard]},
    {path: "orders", component: UnderDevelopmentComponent, canActivate: [authGuard]},
    {path: "shipments", component: UnderDevelopmentComponent, canActivate: [authGuard]},
    {path: "help", component: UnderDevelopmentComponent, canActivate: [authGuard]},

    {path: "**", component: NotFoundPageComponent},
];
