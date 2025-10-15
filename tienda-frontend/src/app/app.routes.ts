import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './pages/login.component';
import { RegisterComponent } from './pages/register.component';
import { ProductsListComponent } from './pages/products-list.component';
import { CartComponent } from './pages/cart.component';
import { FavoritesComponent } from './pages/favorites.component';
import { CheckoutComponent } from './pages/checkout.component';
import { AdminProductsComponent } from './pages/admin-products.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'cart', component: CartComponent, canActivate:[authGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate:[authGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate:[authGuard] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate:[adminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];
