import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './features/book-detail/book-detail.component';
import { DashBoardComponent } from './components/dashboard/dashboard.component';
import { loginGuard } from './login.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TipiComponent } from './pages/tipi/tipi.component';
import { ContattiComponent } from './pages/contatti/contatti.component';
import { AboutComponent } from './pages/about/about.component';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path : 'dashboard/:id', component: BookDetailComponent, canActivate:[loginGuard]},
  { path: 'dashboard', component: DashBoardComponent, canActivate: [loginGuard] },
  {path : 'login', component: LoginComponent},
  {path : 'logout', redirectTo: 'login', pathMatch:'full'},
  { path: 'tipi', component: TipiComponent },
  { path: 'contatti', component: ContattiComponent },
  { path: 'about', component: AboutComponent },
   {path : '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
