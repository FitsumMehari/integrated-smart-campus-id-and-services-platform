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
import { MessagesListComponent } from './pages/messages-list/messages-list.component';
import { NoticesListComponent } from './pages/notices-list/notices-list.component';
import { StudentsListComponent } from './pages/students-list/students-list.component';
import { CafeAdminsListComponent } from './pages/cafe-admins-list/cafe-admins-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          { path: 'students', component: StudentsListComponent },
          { path: 'admins', component: AdminsListComponent },
          { path: 'notices', component: NoticesListComponent },
          { path: 'messages', component: MessagesListComponent },
          { path: '', redirectTo: 'students', pathMatch: 'full' }, // Default route
        ],
      },
      {
        path: 'cafe',
        component: CafeComponent,

        children: [
          { path: 'students', component: StudentsListComponent },
          { path: 'admins', component: CafeAdminsListComponent },
          { path: 'notices', component: NoticesListComponent },
          { path: 'messages', component: MessagesListComponent },
          { path: '', redirectTo: 'students', pathMatch: 'full' }, // Default route
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
