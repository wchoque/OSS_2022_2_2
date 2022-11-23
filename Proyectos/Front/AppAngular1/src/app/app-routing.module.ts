import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { HomeProductComponent } from './home-product/home-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  {path:"list", component:ProductListComponent},
  {path:"detalle/:codigo", component: ProductDetailsComponent},
  {path:"update/:codigo", component:UpdateProductComponent},
  {path:"create", component:CreateProductComponent},
  {path:"home" ,  component: HomeProductComponent},
  {path:'', redirectTo: "/home", pathMatch:'full'},
  {path:"**", component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
