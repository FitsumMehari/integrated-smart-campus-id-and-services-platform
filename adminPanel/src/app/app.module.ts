import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BaseChartDirective } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator'; // Import MatPaginatorModule
import {  MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule


import { ReactiveFormsModule } from '@angular/forms';

import { HttpClient, provideHttpClient } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CafeComponent } from './pages/cafe/cafe.component';
import { GateComponent } from './pages/gate/gate.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { CafeStudentsListComponent } from './pages/cafe-students-list/cafe-students-list.component';
import { AdminsListComponent } from './pages/admins-list/admins-list.component';
import { CafeNoticesListComponent } from './pages/cafe-notices-list/cafe-notices-list.component';
import { CafeMessagesListComponent } from './pages/cafe-messages-list/cafe-messages-list.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { CafeAdminsListComponent } from './pages/cafe-admins-list/cafe-admins-list.component';
import { CreatenewpasswordComponent } from './pages/createnewpassword/createnewpassword.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { OTPVerificationComponent } from './pages/otpverification/otpverification.component';
import { GateAdminsListComponent } from './pages/gate-admins-list/gate-admins-list.component';
import { GateNoticesListComponent } from './pages/gate-notices-list/gate-notices-list.component';
import { GateMessagesListComponent } from './pages/gate-messages-list/gate-messages-list.component';
import { SchoolMessagesListComponent } from './pages/school-messages-list/school-messages-list.component';
import { SchoolNoticesListComponent } from './pages/school-notices-list/school-notices-list.component';
import { SchoolAdminsListComponent } from './pages/school-admins-list/school-admins-list.component';
import { SchoolStudentsListComponent } from './pages/school-students-list/school-students-list.component';
import { SchoolComponent } from './pages/school/school.component';
import { RegistrarMessagesListComponent } from './pages/registrar-messages-list/registrar-messages-list.component';
import { RegistrarStudentsListComponent } from './pages/registrar-students-list/registrar-students-list.component';
import { RegistrarNoticesListComponent } from './pages/registrar-notices-list/registrar-notices-list.component';
import { RegistrarAdminsListComponent } from './pages/registrar-admins-list/registrar-admins-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    NotFoundComponent,
    DashboardComponent,
    CafeComponent,
    GateComponent,
    RegistrarComponent,
    CafeStudentsListComponent,
    AdminsListComponent,
    CafeNoticesListComponent,
    CafeMessagesListComponent,
    CafeAdminsListComponent,
    CreatenewpasswordComponent,
    ForgotpasswordComponent,
    OTPVerificationComponent,
    GateAdminsListComponent,
    GateNoticesListComponent,
    GateMessagesListComponent,
    SchoolMessagesListComponent,
    SchoolNoticesListComponent,
    SchoolAdminsListComponent,
    SchoolStudentsListComponent,
    SchoolComponent,
    RegistrarMessagesListComponent,
    RegistrarStudentsListComponent,
    RegistrarNoticesListComponent,
    RegistrarAdminsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSnackBarModule,
    FileUploadModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
