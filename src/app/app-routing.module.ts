import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

  {
    path: 'bill-approve',
    loadChildren: () => import('./bill-approve/bill-approve.module').then( m => m.BillApprovePageModule)
  },
  {
    path: 'stockchart-view',
    loadChildren: () => import('./stockchart-view/stockchart-view.module').then( m => m.StockchartViewPageModule)
  },
  {
    path: 'saleschart-view',
    loadChildren: () => import('./saleschart-view/saleschart-view.module').then( m => m.SaleschartViewPageModule)
  },
  {
    path: 'reporthistory',
    loadChildren: () => import('./reporthistory/reporthistory.module').then( m => m.ReporthistoryPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
