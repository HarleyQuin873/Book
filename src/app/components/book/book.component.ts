import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/model/book';
import { FormsModule, NgForm } from '@angular/forms';
import { BookService } from 'src/app/service/book.service';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { SpinnerComponent } from 'src/app/features/spinner/spinner.component';
import { FormComponent } from 'src/app/shared/form/form.component';
import { CommonModule } from '@angular/common';
//import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { RouterModule } from '@angular/router';

// const ApiUrl = 'http://localhost:3000/books';

@Component({
  selector: 'app-book',
    standalone: true,    
    imports: [
    CommonModule,
    FormsModule,
     RouterModule,  
   NgxPaginationModule,
 //  Ng2SearchPipeModule,
    FormComponent,
    SpinnerComponent,
    SearchbarComponent, 
    FilterPipe
  ],
  templateUrl:'./book.component.html',
  styleUrls: ['./book.component.scss'],
 
})
export class BookComponent {
  books: Book[] = [];
  error : any;
  // active : Book;
  active: Book | null = null;
  // p = 1;
  p: number = 1;
 

  filteredBooks: Book[] = [];
  term: string = '';
  

  constructor(private http: HttpClient , private bookService : BookService){

  }
  
  getAll(){
  //   this.http.get<Book[]>(ApiUrl)
  //   .subscribe( (res:Book[]) => {
  //      console.log(res);
  //      this.books = res;
  //   },
  //   err => this.error = err
  // );

      this.bookService.getAll()    //http.get<Book[]>(ApiUrl)
      .subscribe({
      next: (res: Book[]) => {
        console.log(res);
        this.books = res;
      },
      // next: (res: Book[]) => {
      //   this.books = res;
      //   this.filteredBooks = res;   // 🔥 copia iniziale
      // },
      error: (err) => {
        this.error = err;
      }
    });
  }

  

  delete(event: MouseEvent, book : Book){
    event.stopPropagation();
    // console.log(book);
    // const index = this.books.indexOf(book);
  //   this.http.delete<Book>(`${ApiUrl}/${book.id}`)
  //   .subscribe(() =>{
  //     const index = this.books.findIndex(b => b.id === book.id);
  //     this.books.splice(index,1);
  //   },
  //   // (error) => console.log(error)
  //   err => this.error = err

  // );

      this.bookService.deleteBook(book)     //.http.delete(`${ApiUrl}/${book.id}`)
      .subscribe({
      next: () => {
        const index = this.books.findIndex(b => b.id === book.id);
        this.books.splice(index, 1);
      },
      error: (err) => {
        this.error = err;
      }
    });
  }
  
  setActive(book: Book){
     this.active = book;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAll();
    
  }

  reset(){
    this.active=null;
  }

  onSearch(term: string) {
  this.term = term;

  this.filteredBooks = this.books.filter(book =>
    book.title.toLowerCase().includes(term.toLowerCase()) ||
    book.author.toLowerCase().includes(term.toLowerCase())
  );
   this.p = 1; // resetta pagina a 1
}
}
