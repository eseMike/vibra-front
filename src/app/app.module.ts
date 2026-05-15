import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { DiscoverComponent } from './discover/discover.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UnderageComponent } from './underage/underage.component';
import { AgeModalComponent } from './age-modal/age-modal.component';
import { PrivacyModalComponent } from './privacy-modal/privacy-modal.component';
import { PrivacyNoticeComponent } from './privacy-notice/privacy-notice.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { CreatorRegisterComponent } from './creator/creator-register/creator-register.component';
import { CreatorEditProfileComponent } from './creator/creator-edit-profile/creator-edit-profile.component';
import { CreatorDashboardComponent } from './creator/creator-dashboard/creator-dashboard.component';
import { CreatorUploadComponent } from './creator/creator-upload/creator-upload.component';
import { CreatorContentComponent } from './creator/creator-content/creator-content.component';
import { SettingsComponent } from './settings/settings.component';
import { CreatorSubscribersComponent } from './creator/creator-subscribers/creator-subscribers.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CreatorOnboardingComponent } from './creator/creator-onboarding/creator-onboarding.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    DiscoverComponent,
    HomeComponent,
    HeaderComponent,
    PerfilComponent,
    UnderageComponent,
    AgeModalComponent,
    PrivacyModalComponent,
    PrivacyNoticeComponent,
    FooterComponent,
    LandingComponent,
    CreatorOnboardingComponent,
    UserProfileComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
