import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/model/book';
import { NgForm } from '@angular/forms';

const ApiUrl = 'http://localhost:3000/books';

@Component({
  selector: 'app-book',
  templateUrl:'./book.component.html',
  styleUrls: ['./book.component.scss'],
 
})
export class BookComponent {
  books: Book[] = [];
  error : any;
  // active : Book;
  active: Book | null = null;
  imageSrc: string = '';

  constructor(private http: HttpClient ){}
  
  getAll(){
  //   this.http.get<Book[]>(ApiUrl)
  //   .subscribe( (res:Book[]) => {
  //      console.log(res);
  //      this.books = res;
  //   },
  //   err => this.error = err
  // );

      this.http.get<Book[]>(ApiUrl).subscribe({
      next: (res: Book[]) => {
        console.log(res);
        this.books = res;
      },
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

      this.http.delete(`${ApiUrl}/${book.id}`).subscribe({
      next: () => {
        const index = this.books.findIndex(b => b.id === book.id);
        this.books.splice(index, 1);
      },
      error: (err) => {
        this.error = err;
      }
    });
  }

  

  reset(form : NgForm){
    // this.books = null;
    // form = null;

    this.imageSrc = '';
    this.active = null;
    form.reset();
  }
  setActive(book: Book){
     this.active = book;
  }

  add(form: NgForm){
    // const newBook = { ...form.value, img: this.imageSrc };

    // console.log(form.value);
    this.http.post<Book>(`${ApiUrl}`, form.value)
    .subscribe((res:Book) =>{
      this.books.push(res);
      form.reset();
      this.imageSrc = '';
      // this.reset(form);
    });
  }

  
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


 edit(form: NgForm){
  if (!this.active) {
    throw new Error('Active book is null');
    // return;
  }
  const id = this.active.id;
  
  this.http.patch<Book>(`${ApiUrl}/${id}`, form.value)
  .subscribe(res =>{

    // console.log('edit element ');
    const index = this.books.findIndex(b => b.id === id);
    this.books[index] = res;
  })
    
  }

  save(form: NgForm){
    if(this.active){
      this.edit(form);
    }
    else{
      this.add(form);
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAll();
    
  }

}
