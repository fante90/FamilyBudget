import { NgModule } from '@angular/core';
import { RouterModule, Routes, NoPreloading, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'list-categories',
    loadChildren: () => import('./pages/list-categories/list-categories.module').then(m => m.ListCategoriesPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  }
];
@NgModule({
  imports: [
    // Impostato il preload di tutti i moduli per far si che in modalità PWA offline è possibile accedere a tutte le videate
    // sono escluse solo le risorse di tipo immagine che in caso si vada offline non vengono caricate ma non compromettono la
    // funzionalità della PWA
    RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading }) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
