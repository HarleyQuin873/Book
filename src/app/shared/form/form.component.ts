import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/model/book';
import { HttpClient } from '@angular/common/http';
import { BookService } from 'src/app/service/book.service';
import { CommonModule } from '@angular/common';

const ApiUrl = 'http://localhost:3000/books';

@Component({
  selector: 'app-form',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./form.component.html',
  styles: [
  ]
})
export class FormComponent {
  imageSrc: string = '';

   // dati che arrivano dal padre
  @Input() active: Book | null = null;
  @Input() books: Book[] = [];

  // @Input() active: Book;
  // @Input() imageSrc: string | null = null;
  // @Input() books: Book[];

  // eventi verso il padre
  @Output() saveForm = new EventEmitter<NgForm>();
  @Output() resetForm = new EventEmitter<NgForm>();
  @Output() imageChange = new EventEmitter<Event>();
  @Output() resetClick : EventEmitter<Book> = new EventEmitter<Book>(); //</Book>

  // save(form: NgForm) {
  //   this.saveForm.emit(form);
  // }

  constructor(private http: HttpClient, private bookService : BookService) {
    // const srv = new BookServiceService(); //grazie all'Injectable possiamo evitare questa parte
    this.bookService

  }
  save(form: NgForm){
    if(this.active){
      this.edit(form);
    }
    else{
      this.add(form);
    }
  }

  add(form: NgForm){
    // const newBook = { ...form.value, img: this.imageSrc };

    // console.log(form.value);
    this.bookService.addBook(form)     //http.post<Book>(`${ApiUrl}`, form.value)
    .subscribe((res:Book) =>{
      // setTimeout(() => {
      //   this.books.push(res);
      // }, 500);
      this.books.push(res);
     // location.reload();
      form.reset();
      this.imageSrc = '';
      // this.reset(form);
     
    });
  }

 edit(form: NgForm){
  if (!this.active) {
    throw new Error('Active book is null');
    // return;
  }
  const id = this.active.id;
  
  this.bookService.editBook(form, this.active)  //http.patch<Book>(`${ApiUrl}/${id}`, form.value)
  .subscribe(res =>{

    // console.log('edit element ');
    const index = this.books.findIndex(b => b.id === id);
    this.books[index] = res;
    location.reload(); // in modo tale che mi refresci la pagina e io veda subito i risultati
  })
    
  }


  // reset(form: NgForm) {
  //   this.resetForm.emit(form);
  // }
  reset(form : NgForm){
    // this.books = null;
    // form = null;

    this.imageSrc = '';
    this.active = null;
    this.resetClick.emit();
    form.reset();
  }

  // readUrl(event: Event) {
  //   this.imageChange.emit(event);
  // }

  readUrl(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string; // salva sempre
        if (this.active) {
          this.active.img = this.imageSrc; // solo per modifica libri
        }
      };
    }
  }

}
