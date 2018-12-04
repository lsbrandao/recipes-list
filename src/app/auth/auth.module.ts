import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent,
        AccessDeniedComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}
