import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './features/book-detail/book-detail.component';
import { BookComponent } from './components/book/book.component';

export const routes: Routes = [
  {path : 'book/:id', component: BookDetailComponent},
  {path : 'book', component: BookComponent},
  {path : '', component: BookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
