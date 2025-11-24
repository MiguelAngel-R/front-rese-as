import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/login.guard';
import { LoginGuard } from './guards/home.guard';



export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [AuthGuard] // Protege el login para usuarios ya autenticados
  },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [LoginGuard] // Protege el home para usuarios no autenticados
  },
  { path: '**', redirectTo: '/home' }
];
