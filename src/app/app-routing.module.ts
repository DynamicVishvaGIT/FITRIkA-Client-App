import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
  {
    path: 'basic-info',
    loadChildren: () => import('./basic-info/basic-info.module').then( m => m.BasicInfoPageModule)
  },
  {
    path: 'coaches',
    loadChildren: () => import('./coaches/coaches.module').then( m => m.CoachesPageModule)
  },
  {
    path: 'current-fitness',
    loadChildren: () => import('./current-fitness/current-fitness.module').then( m => m.CurrentFitnessPageModule)
  },
  {
    path: 'diet-preference',
    loadChildren: () => import('./diet-preference/diet-preference.module').then( m => m.DietPreferencePageModule)
  },
  {
    path: 'find-your-trainer',
    loadChildren: () => import('./find-your-trainer/find-your-trainer.module').then( m => m.FindYourTrainerPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'main-goal',
    loadChildren: () => import('./main-goal/main-goal.module').then( m => m.MainGoalPageModule)
  },
  {
    path: 'otp-verification',
    loadChildren: () => import('./otp-verification/otp-verification.module').then( m => m.OtpVerificationPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then( m => m.TaskPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'your-goal',
    loadChildren: () => import('./your-goal/your-goal.module').then( m => m.YourGoalPageModule)
  },
  {
    path: 'find-trainer',
    loadChildren: () => import('./find-trainer/find-trainer.module').then( m => m.FindTrainerPageModule)
  },
  {
    path: 'add-coaches',
    loadChildren: () => import('./add-coaches/add-coaches.module').then( m => m.AddCoachesPageModule)
  },
  {
    path: 'coaches-detailed',
    loadChildren: () => import('./coaches-detailed/coaches-detailed.module').then( m => m.CoachesDetailedPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
