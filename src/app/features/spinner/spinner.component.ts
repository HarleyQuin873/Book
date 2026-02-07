import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-spinner',
  standalone:true,
  imports:[CommonModule,FormsModule],
  template: `
    <div class="d-flex justify-content-center">
           <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
           </div>
        </div>
  `,
  styles: [
  ]
})
export class SpinnerComponent {

}
