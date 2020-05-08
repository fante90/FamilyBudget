import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 't',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'list-moviments',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./list-moviments/list-moviments.module').then(m => m.ListMovimentPageModule)
          }
        ]
      },
      {
        path: 'stats',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./stats/stats.module').then(m => m.StatsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/t/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/t/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
