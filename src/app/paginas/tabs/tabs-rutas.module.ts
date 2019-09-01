import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes =[
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'tab-categorias',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../categorias/categorias.module').then(m => m.CategoriasPageModule)
          }
        ]
      },
      {
        path: 'tab-pedidos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../ordenes/ordenes.module').then(m => m.OrdenesPageModule)
          }
        ]
      }, 
      {
        path: 'tab-busqueda',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../busqueda/busqueda.module').then(m => m.BusquedaPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab-home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-home',
    pathMatch: 'full'
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRutasModule { }
