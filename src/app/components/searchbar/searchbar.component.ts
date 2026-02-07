import { Book } from 'src/app/model/book';
// import { BookComponent } from 'src/app/components/book/book.component';
// import { BookDetailComponent } from 'src/app/features/book-detail/book-detail.component';
import { Component, Input,  Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
  
})
export class SearchbarComponent {
  @Input() books: Book[] = [];  
  @Output() search = new EventEmitter<string>();
  term: string = '';             
 
  filteredBooks: Book[] = [];
  onSearch() {
    this.search.emit(this.term);
  }
//   onSearch() {
//   this.filteredBooks = this.books.filter(book =>
//     book.title.toLowerCase().includes(this.term.toLowerCase()) ||
//     book.author.toLowerCase().includes(this.term.toLowerCase())
//   );
// }

}
