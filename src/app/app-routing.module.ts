import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./paginas/home/home.module').then( m => m.HomePageModule)},
  { path: 'carrito', loadChildren: './paginas/carrito/carrito.module#CarritoPageModule' },
  { path: 'categorias', loadChildren: './paginas/categorias/categorias.module#CategoriasPageModule' },
  { path: 'login', loadChildren: './paginas/login/login.module#LoginPageModule' },
  { path: 'ordenes', loadChildren: './paginas/ordenes/ordenes.module#OrdenesPageModule' },
  { path: 'ordenes-detalle', loadChildren: './paginas/ordenes-detalle/ordenes-detalle.module#OrdenesDetallePageModule' },
  { path: 'por-categorias', loadChildren: './paginas/por-categorias/por-categorias.module#PorCategoriasPageModule' },
  { path: 'producto', loadChildren: './paginas/producto/producto.module#ProductoPageModule' },
  { path: 'tabs', loadChildren: './paginas/tabs/tabs.module#TabsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
