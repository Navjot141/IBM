import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductsModule } from './products/products.module';

const routes: Routes = [
  {
    // path: '',
    // loadChildren: () => import('./products/products.module').then(p => p.ProductsModule)
      path: '',
      component: ProductListComponent,
      pathMatch: 'full',
    },
    {
      // path: '',
      // loadChildren: () => import('./products/products.module').then(p => p.ProductsModule)
        path: 'add',
        component: ProductAddComponent
      },
    {
      // path: '',
      // loadChildren: () => import('./products/products.module').then(p => p.ProductsModule)
        path: 'details/:id',
        component: ProductDetailsComponent
      },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
