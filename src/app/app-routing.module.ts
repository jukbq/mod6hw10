import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ActionsComponent } from './pages/actions/actions.component'
import { RolesComponent } from './pages/roles/roles.component';
import { SetsComponent } from './pages/sets/sets.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { SaucesComponent } from './pages/sauces/sauces.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CoodInfoComponent } from './pages/good-info/good-info.component';
import { ActionInfoComponent } from './pages/action-info/action-info.component';
import { GoodsInfoResolver } from './shared/services/goods-info/goods-info.resolver';
import { ActionInfoResolver } from './shared/services/action-info/action-info.resolver';
import { AdminComponent } from './admin/admin.component';
import { ActionComponent } from './admin/action/action.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { GoodsComponent } from './admin/goods/goods.component';
import { OrderComponent } from './admin/order/order.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home/: link', component: HomeComponent },
  { path: 'home/: link/:id', component: CoodInfoComponent, resolve: {
    goodInfo: GoodsInfoResolver
  } },
  { path: 'action', component: ActionsComponent },
  {
    path: 'action/:id', component: ActionInfoComponent, resolve: {
      actionInfo: ActionInfoResolver
    }
  },
  { path: 'roles/: link', component: RolesComponent },
  {
    path: 'roles/: link/:id', component: CoodInfoComponent, resolve: {
      goodInfo: GoodsInfoResolver
    }
  },
  { path: 'sets', component: SetsComponent  },
  {
    path: 'sets/:id', component: CoodInfoComponent, resolve: {
      goodInfo: GoodsInfoResolver
    }
  },
  { path: 'drinks', component: DrinksComponent },
  {
    path: 'drinks/:id', component: CoodInfoComponent, resolve: {
      goodInfo: GoodsInfoResolver
    }
  },
  { path: 'sauces', component: SaucesComponent },
  {
    path: 'sauces/:id', component: CoodInfoComponent, resolve: {
      goodInfo: GoodsInfoResolver
    }
  },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'action', component: ActionComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'goods', component: GoodsComponent },
    { path: 'order', component: OrderComponent },
    { path: '', pathMatch: 'full', redirectTo: 'action' }
  ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
