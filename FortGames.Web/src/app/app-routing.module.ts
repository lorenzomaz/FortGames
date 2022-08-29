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
  { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
  { path: 'advanced_search', loadChildren: () => import('./components/advanced-search/advanced-search.module').then(m => m.AdvancedSearchModule) },
  { path: 'add-game', loadChildren: () => import('./features/add-game/add-game.module').then(m => m.AddGameModule), canActivate: [AuthGuard] },
  { path: 'edit-games', loadChildren: () => import('./features/edit-games/edit-games.module').then(m => m.EditGamesModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
