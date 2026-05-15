import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './discover/discover.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { authGuard } from './guards/auth.guard';
import { ConsentGuard } from './guards/consent.guard';
import { premiumGuard } from './guards/premium.guard';
import { LandingComponent } from './landing/landing.component';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { creatorGuard } from './guards/auth.guard';

const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    router.navigate(['/discover']);
    return false;
  }

  return true;
};

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'discover',
    component: DiscoverComponent,
    canActivate: [authGuard],
  },
  {
    path: 'creadoras',
    loadComponent: () =>
      import('./creadoras/creadoras.component').then(
        (m) => m.CreadorasComponent,
      ),
    canActivate: [authGuard],
  },
  { path: 'perfil/:id', component: PerfilComponent, canActivate: [authGuard] },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
  {
    path: 'videochat',
    loadComponent: () =>
      import('./videochat/videochat.component').then(
        (m) => m.VideochatComponent,
      ),
    canActivate: [authGuard, premiumGuard],
  },
  {
    path: 'underage',
    loadComponent: () =>
      import('./underage/underage.component').then((m) => m.UnderageComponent),
  },
  {
    path: 'creator-login',
    loadComponent: () =>
      import('./creator/creator-login/creator-login.component').then(
        (m) => m.CreatorLoginComponent,
      ),
  },
  {
    path: 'creator-register',
    loadComponent: () =>
      import('./creator/creator-register/creator-register.component').then(
        (m) => m.CreatorRegisterComponent,
      ),
  },
  {
    path: 'creator-edit-profile',
    loadComponent: () =>
      import(
        './creator/creator-edit-profile/creator-edit-profile.component'
      ).then((m) => m.CreatorEditProfileComponent),
    canActivate: [creatorGuard],
  },
  {
    path: 'creator-dashboard',
    loadComponent: () =>
      import('./creator/creator-dashboard/creator-dashboard.component').then(
        (m) => m.CreatorDashboardComponent,
      ),
    canActivate: [creatorGuard],
  },
  {
    path: 'creator-upload',
    loadComponent: () =>
      import('./creator/creator-upload/creator-upload.component').then(
        (m) => m.CreatorUploadComponent,
      ),
    canActivate: [creatorGuard],
  },
  {
    path: 'creator-content',
    loadComponent: () =>
      import('./creator/creator-content/creator-content.component').then(
        (m) => m.CreatorContentComponent,
      ),
    canActivate: [creatorGuard],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then((m) => m.SettingsComponent),
  },
  {
    path: 'creator-subscribers',
    loadComponent: () =>
      import(
        './creator/creator-subscribers/creator-subscribers.component'
      ).then((m) => m.CreatorSubscribersComponent),
    canActivate: [creatorGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [guestGuard],
  },
  { path: 'landing', component: LandingComponent, canActivate: [ConsentGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
