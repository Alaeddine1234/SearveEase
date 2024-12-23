import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { FactureComponent } from './facture/facture.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { PanierComponent } from './panier/panier.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ProductsComponent } from './products/products.component';
import { WaiterDashboardComponent } from './waiter-dashboard/waiter-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'facture/:id', component: FactureComponent },
  { path: 'payment/:id', component: PaymentComponent },
  { path: 'users', component: UserManagementComponent },
  { path: 'cart/:username', component: PanierComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'client-dashboard', component: ClientDashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'waiter-dashboard', component: WaiterDashboardComponent },
  { path: 'index', component: IndexComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'my-orders/:username', component: MyOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
