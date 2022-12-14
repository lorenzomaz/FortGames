import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './providers/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./features/register/register.module').then(m => m.RegisterModule) },
  { path: 'game-page', loadChildren: () => import('./features/game-page/game-page.module').then(m => m.GamePageModule) },
  { path: 'account', loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule), canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: () => import('./features/account-settings/account-settings.module').then(m => m.AccountSettingsModule), canActivate: [AuthGuard]},
  { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
  { path: 'advanced_search', loadChildren: () => import('./components/advanced-search/advanced-search.module').then(m => m.AdvancedSearchModule) },
  { path: 'add-game', loadChildren: () => import('./features/add-game/add-game.module').then(m => m.AddGameModule), canActivate: [AuthGuard] },
  { path: 'add-company', loadChildren: () => import('./features/add-company/add-company.module').then(m => m.AddCompanyModule), canActivate: [AuthGuard] },
  { path: 'add-genre', loadChildren: () => import('./features/add-genre/add-genre.module').then(m => m.AddGenreModule), canActivate: [AuthGuard] },
  { path: 'add-mode', loadChildren: () => import('./features/add-mode/add-mode.module').then(m => m.AddModeModule), canActivate: [AuthGuard] },
  { path: 'add-platform', loadChildren: () => import('./features/add-platform/add-platform.module').then(m => m.AddPlatformModule), canActivate: [AuthGuard] },
  { path: 'home', redirectTo: '' },
  { path: 'edit-games', loadChildren: () => import('./features/edit-games/edit-games.module').then(m => m.EditGamesModule), canActivate: [AuthGuard] },
  { path: 'edit-companies', loadChildren: () => import('./features/edit-companies/edit-companies.module').then(m => m.EditCompaniesModule), canActivate: [AuthGuard] },
  { path: 'edit-genres', loadChildren: () => import('./features/edit-genres/edit-genres.module').then(m => m.EditGenresModule), canActivate: [AuthGuard] },
  { path: 'edit-modes', loadChildren: () => import('./features/edit-modes/edit-modes.module').then(m => m.EditModesModule), canActivate: [AuthGuard] },
  { path: 'edit-platforms', loadChildren: () => import('./features/edit-platforms/edit-platforms.module').then(m => m.EditPlatformsModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
