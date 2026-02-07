import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';

// const ApiUrl = 'http://localhost:3000/books';
@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports:[
    CommonModule,
     TruncatePipe, 
    FormsModule,
    SpinnerComponent],
  templateUrl : './book-detail.component.html',
  //styleUrls: ['./book-detail.component.css'],
  template: `
    <!-- <p>
      book-detail works!
    </p> -->
    <!-- <pre> {{book | json}}</pre> -->

     <!-- <div *ngIf="book">
      <h2>{{ book.title }}</h2>
      <p>Autore: {{ book.author }}</p>
      <p>Prezzo: € {{ book.price }}</p>
      <img *ngIf="book.img" [src]="book.img" alt="{{ book.title }}" width="200">
      <p>{{ book.description }}</p>
    </div> -->
  `,
  styles: [`
    /* .bellottaFont {
      font-family: 'Bellota', cursive;
    }
    .btn-group-sm > .btn, .btn-sm {
      padding: .25rem .5rem;
      font-size: .875rem;
      line-height: 1.5;
      border-radius: .2rem;
    } */
  `]
  
})
export class BookDetailComponent {
  book?: Book;
  books: Book[] = [];

  constructor(
    private bookService: BookService, // http: HttpClient, 
    private location : Location,
    private activatedRoute: ActivatedRoute //ci fornisce informazioni sulla rotta corrente
  ){


    
  }

  goBack():void{

    this.location.back();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log(this.activatedRoute);
    // console.log('ID libro:', id);
    // console.log(this.activatedRoute.snapshot.params["id"]);
    //  console.log(this.activatedRoute.snapshot.paramMap.get('id'));
      // console.log(this.route.snapshot.paramMap.get('id'));
      //  console.log(this.activatedRoute.snapshot.paramMap.get('id'));
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
     
      console.log(id);
      this.book = this.books.find(b => b.id === id);
       //http.get<Book>(`${ApiUrl}/${id}`)
      this.bookService.detailBook(id)      
      .subscribe( (res: Book)=> {
        this.book = res;
      });
  }

}
