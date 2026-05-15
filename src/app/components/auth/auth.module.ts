import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterCreatorComponent } from './register-creator/register-creator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RegisterComponent } from '../../auth/pages/register/register.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterUserComponent,
    RegisterCreatorComponent,
    AuthLayoutComponent,
    RegisterComponent,
    RecoverPasswordComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
