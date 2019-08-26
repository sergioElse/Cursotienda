import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./paginas/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'producto', loadChildren: './paginas/producto/producto.module#ProductoPageModule' },
  { path: 'carrito', loadChildren: './paginas/carrito/carrito.module#CarritoPageModule' },
  { path: 'login', loadChildren: './paginas/login/login.module#LoginPageModule' },
  { path: 'ordenes-detalle', loadChildren: './paginas/ordenes-detalle/ordenes-detalle.module#OrdenesDetallePageModule' },
  { path: 'por-categorias', loadChildren: './paginas/por-categorias/por-categorias.module#PorCategoriasPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
