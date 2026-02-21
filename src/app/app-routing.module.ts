import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './features/book-detail/book-detail.component';
import { DashBoardComponent } from './components/dashboard/dashboard.component';
//import { LoginGuard } from './login.guard';
import { loginGuard } from './login.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path : 'dashboard/:id', component: BookDetailComponent, canActivate:[loginGuard]},
  {path : 'book', component: DashBoardComponent, canActivate:[loginGuard]},
  //{path : 'book', component: DashBoardComponent},
  {path : '', component: DashBoardComponent},
  {path : 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
