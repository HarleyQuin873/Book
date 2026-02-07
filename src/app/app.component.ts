import { Component } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,          
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    RouterModule              
  ],
  template: `
  <app-header></app-header>
  <!-- <app-book></app-book> -->
   <router-outlet></router-outlet>
  <app-footer></app-footer>
  
  `,
  styles: []
})
export class AppComponent {
  title = 'book';
}
