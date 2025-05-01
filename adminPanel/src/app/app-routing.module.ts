import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CafeComponent } from './pages/cafe/cafe.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GateComponent } from './pages/gate/gate.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { AdminsListComponent } from './pages/admins-list/admins-list.component';
import { CafeMessagesListComponent } from './pages/cafe-messages-list/cafe-messages-list.component';
import { CafeNoticesListComponent } from './pages/cafe-notices-list/cafe-notices-list.component';
import { CafeStudentsListComponent } from './pages/cafe-students-list/cafe-students-list.component';
import { CafeAdminsListComponent } from './pages/cafe-admins-list/cafe-admins-list.component';
import { CreatenewpasswordComponent } from './pages/createnewpassword/createnewpassword.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { OTPVerificationComponent } from './pages/otpverification/otpverification.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'createnewpassword', component: CreatenewpasswordComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'verifyotp', component: OTPVerificationComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          { path: 'students', component: CafeStudentsListComponent },
          { path: 'admins', component: AdminsListComponent },
          { path: 'notices', component: CafeNoticesListComponent },
          { path: 'messages', component: CafeMessagesListComponent },
          { path: '', redirectTo: 'admins', pathMatch: 'full' }, // Default route
        ],
      },
      {
        path: 'cafe',
        component: CafeComponent,

        children: [
          { path: 'students', component: CafeStudentsListComponent },
          { path: 'admins', component: CafeAdminsListComponent },
          { path: 'notices', component: CafeNoticesListComponent },
          { path: 'messages', component: CafeMessagesListComponent },
          { path: '', redirectTo: 'admins', pathMatch: 'full' }, // Default route
        ],
      },

      { path: 'gate', component: GateComponent },
      {
        path: 'registrar',
        component: RegistrarComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
