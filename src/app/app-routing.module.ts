import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full',
},
  {
    path: 'login',
    loadComponent: () => import('./paginas/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./paginas/inicio/inicio.module').then(m => m.InicioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alert',
    loadChildren: () => import('./paginas/alert/alert.module').then(m => m.AlertPageModule),
    canActivate: [AuthGuard]
  },
   {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'card',
    loadChildren: () => import('./paginas/card/card.module').then( m => m.CardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'datetime',
    loadChildren: () => import('./paginas/datetime/datetime.module').then( m => m.DatetimePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'checkbox',
    loadChildren: () => import('./paginas/checkbox/checkbox.module').then( m => m.CheckboxPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'fab',
    loadChildren: () => import('./paginas/fab/fab.module').then( m => m.FabPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'infinite',
    loadChildren: () => import('./paginas/infinite/infinite.module').then( m => m.InfinitePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'inputs',
    loadChildren: () => import('./paginas/inputs/inputs.module').then( m => m.InputsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'grid',
    loadChildren: () => import('./paginas/grid/grid.module').then( m => m.GridPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'modal',
    loadChildren: () => import('./paginas/modal/modal.module').then( m => m.ModalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'popover',
    loadChildren: () => import('./paginas/popover/popover.module').then( m => m.PopoverPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./paginas/list/list.module').then( m => m.ListPageModule),
    canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
