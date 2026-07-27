import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'diet-details',
    loadChildren: () => import('./diet-details/diet-details.module').then( m => m.DietDetailsPageModule)
  },
  {
    path: 'task-detail-screen',
    loadChildren: () => import('./task-detail-screen/task-detail-screen.module').then( m => m.TaskDetailScreenPageModule)
  },
  {
    path: 'programs',
    loadChildren: () => import('./programs/programs.module').then( m => m.ProgramsPageModule)
  },
  {
    path: 'program-detail',
    loadChildren: () => import('./program-detail/program-detail.module').then( m => m.ProgramDetailPageModule)
  },
  {
    path: 'coaches-details',
    loadChildren: () => import('./coaches-details/coaches-details.module').then( m => m.CoachesDetailsPageModule)
  },
  {
    path: 'how-did',
    loadChildren: () => import('./how-did/how-did.module').then( m => m.HowDidPageModule)
  },
  {
    path: 'how-did-you',
    loadChildren: () => import('./how-did-you/how-did-you.module').then( m => m.HowDidYouPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
