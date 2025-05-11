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
import { GateAdminsListComponent } from './pages/gate-admins-list/gate-admins-list.component';
import { GateNoticesListComponent } from './pages/gate-notices-list/gate-notices-list.component';
import { GateMessagesListComponent } from './pages/gate-messages-list/gate-messages-list.component';
import { SchoolComponent } from './pages/school/school.component';
import { SchoolAdminsListComponent } from './pages/school-admins-list/school-admins-list.component';
import { SchoolNoticesListComponent } from './pages/school-notices-list/school-notices-list.component';
import { SchoolMessagesListComponent } from './pages/school-messages-list/school-messages-list.component';
import { SchoolStudentsListComponent } from './pages/school-students-list/school-students-list.component';
import { RegistrarStudentsListComponent } from './pages/registrar-students-list/registrar-students-list.component';
import { RegistrarAdminsListComponent } from './pages/registrar-admins-list/registrar-admins-list.component';
import { RegistrarNoticesListComponent } from './pages/registrar-notices-list/registrar-notices-list.component';
import { RegistrarMessagesListComponent } from './pages/registrar-messages-list/registrar-messages-list.component';
import { CafeScanComponent } from './pages/cafe-scan/cafe-scan.component';
import { GateScanComponent } from './pages/gate-scan/gate-scan.component';
import { dashboardGuard } from './guards/dashboard.guard';

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
        canActivate: [dashboardGuard],
        children: [
          { path: 'students', component: CafeStudentsListComponent },
          { path: 'admins', component: AdminsListComponent },
          { path: 'notices', component: CafeNoticesListComponent },
          { path: 'messages', component: CafeMessagesListComponent },
          { path: '', redirectTo: 'messages', pathMatch: 'full' }, // Default route
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
          { path: '', redirectTo: 'messages', pathMatch: 'full' }, // Default route
        ],
      },
      {
        path: 'gate',
        component: GateComponent,
        children: [
          { path: 'admins', component: GateAdminsListComponent },
          { path: 'notices', component: GateNoticesListComponent },
          { path: 'messages', component: GateMessagesListComponent },
          { path: '', redirectTo: 'messages', pathMatch: 'full' }, // Default route
        ],
      },
      {
        path: 'school',
        component: SchoolComponent,
        children: [
          { path: 'students', component: SchoolStudentsListComponent },
          { path: 'admins', component: SchoolAdminsListComponent },
          { path: 'notices', component: SchoolNoticesListComponent },
          { path: 'messages', component: SchoolMessagesListComponent },
          { path: '', redirectTo: 'messages', pathMatch: 'full' }, // Default route
        ],
      },
      {
        path: 'registrar',
        component: RegistrarComponent,
        children: [
          { path: 'students', component: RegistrarStudentsListComponent },
          { path: 'admins', component: RegistrarAdminsListComponent },
          { path: 'notices', component: RegistrarNoticesListComponent },
          { path: 'messages', component: RegistrarMessagesListComponent },
          { path: '', redirectTo: 'messages', pathMatch: 'full' }, // Default route
        ],
      },
      { path: 'cafescan', component: CafeScanComponent },
      { path: 'gatescan', component: GateScanComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
